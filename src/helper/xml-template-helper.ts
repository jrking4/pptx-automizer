import JSZip from "jszip";
import {ElementInfo, SlideInfo} from "../types/xml-types";
import {XmlHelper} from "./xml-helper";

export class XmlTemplateHelper {
  archive: JSZip;
  relType: string;
  path: string;

  constructor(archive: JSZip) {
    this.relType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide'
    this.archive = archive
    this.path = 'ppt/_rels/presentation.xml.rels'
  }

  async getCreationIds(): Promise<SlideInfo[]> {
    const archive = await this.archive
    const relationships = await XmlHelper.getTargetsByRelationshipType(
      archive,
      this.path,
      this.relType
    )

    const creationIds = []
    for(const slideRel of relationships) {
      const slideXml = await XmlHelper.getXmlFromArchive(
        archive,
        'ppt/' + slideRel.file
      )

      const creationIdSlide = slideXml
        .getElementsByTagName('p14:creationId')
        .item(0)
        .getAttribute('val')

      const elementIds = this.elementCreationIds(slideXml, archive)

      creationIds.push({
        id: Number(creationIdSlide),
        number: this.parseSlideRelFile(slideRel.file),
        elements: elementIds
      })
    }

    return creationIds
  }

  parseSlideRelFile(slideRelFile: string): number {
    return Number(slideRelFile
      .replace('slides/slide', '')
      .replace('.xml', '')
    )
  }

  elementCreationIds(slideXml, archive): ElementInfo[] {
    const slideElements = slideXml
      .getElementsByTagName('p:cNvPr')

    const elementIds = <ElementInfo[]> []
    for(const item in slideElements) {
      const slideElement = slideElements[item]
      if(slideElement.getAttribute !== undefined) {
        const creationIdElement = slideElement
          .getElementsByTagName('a16:creationId')
        if(creationIdElement.item(0)) {
          elementIds.push(
            this.getElementInfo(slideElement, archive)
          )
        }
      }
    }
    return elementIds
  }

  getElementInfo(slideElement, archive): ElementInfo {
    const elementName = slideElement.getAttribute('name')
    const slideElementParent = slideElement.parentNode.parentNode
    let type = slideElementParent.tagName
    const creationId = slideElement
      .getElementsByTagName('a16:creationId')
      .item(0)
      .getAttribute('id')

    const mapUriType = {
      'http://schemas.openxmlformats.org/drawingml/2006/table': 'table',
      'http://schemas.openxmlformats.org/drawingml/2006/chart': 'chart'
    }

    type = type.replace('p:', '')
    const position = {
      x: 0, y: 0, cx: 0, cy: 0
    }
    let xFrmTag = 'a:xfrm'

    switch(type) {
      case 'graphicFrame':
        const graphicData = slideElementParent.getElementsByTagName('a:graphicData')[0]
        const uri = graphicData.getAttribute('uri')
        type = (mapUriType[uri]) ? mapUriType[uri] : type
        xFrmTag = 'p:xfrm'
        break
    }

    const xFrm = slideElementParent.getElementsByTagName(xFrmTag)
    if(xFrm && xFrm.length) {
      const Off = xFrm[0].getElementsByTagName('a:off')
      const Ext = xFrm[0].getElementsByTagName('a:ext')

      position.x = Number(Off[0].getAttribute('x'))
      position.y = Number(Off[0].getAttribute('y'))
      position.cx = Number(Ext[0].getAttribute('cx'))
      position.cy = Number(Ext[0].getAttribute('cy'))
    }

    return {
      name: elementName,
      type: type,
      id: creationId,
      position: position
    }
  }
}