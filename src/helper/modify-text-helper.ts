import {Color, TextStyle} from '../types/modify-types';
import XmlElements from './xml-elements';
import {vd} from './general-helper';
import {XmlHelper} from './xml-helper';
import ModifyColorHelper from './modify-color-helper';
import ModifyXmlHelper from './modify-xml-helper';

export default class ModifyTextHelper {
  /**
   * Set text content of first paragraph and remove remaining block/paragraph elements.
   */
  static setText = (text: number | string) => (element: Element): void => {
    const paragraphs = element.getElementsByTagName('a:p');
    const length = paragraphs.length;
    for (let i = 0; i < length; i++) {
      const paragraph = paragraphs[i];
      if (i === 0) {
        const blocks = element.getElementsByTagName('a:r');
        const length = blocks.length;
        for (let j = 0; j < length; j++) {
          const block = blocks[j];
          if (j === 0) {
            const textNode = block.getElementsByTagName('a:t')[0];
            ModifyTextHelper.content(text)(textNode)
          } else {
            block.parentNode.removeChild(block);
          }
        }
      } else {
        paragraph.parentNode.removeChild(paragraph);
      }
    }
  };

  static content = (label: number | string) => (element: Element): void => {
    element.firstChild.textContent = String(label);
  };

  /**
   * Set text style insinde an <a:rPr> element
   */
  static style = (style: TextStyle) => (element: Element): void => {
    if(style.color) {
      ModifyTextHelper.setColor(style.color)(element)
    }
    if(style.size) {
      ModifyTextHelper.setSize(style.size)(element)
    }
    if(style.isBold) {
      ModifyTextHelper.setBold(style.isBold)(element)
    }
    if(style.isItalics) {
      ModifyTextHelper.setItalics(style.isItalics)(element)
    }
  }

  /**
   * Set color of text insinde an <a:rPr> element
   */
  static setColor = (color: Color) => (element: Element): void => {
    ModifyColorHelper.solidFill(color)(element)
  };

  /**
   * Set size of text insinde an <a:rPr> element
   */
  static setSize = (size: number) => (element: Element): void => {
    element.setAttribute('sz', String(Math.round(size)));
  };

  /**
   * Set bold attribute on text
   */
  static setBold = (isBold: boolean) => (element: Element): void => {
    ModifyXmlHelper.booleanAttribute('b', isBold)(element)
  };

  /**
   * Set italics attribute on text
   */
  static setItalics = (isItalics: boolean) => (element: Element): void => {
    ModifyXmlHelper.booleanAttribute('i', isItalics)(element)
  };
}