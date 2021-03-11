import Automizer from "../src/automizer"

test("create presentation and add basic slide", async () => {
  const templateFolder = `${__dirname}/../__tests__/pptx-templates/`
  const outputFolder = `${__dirname}/../__tests__/pptx-output/`
  
  const automizer = new Automizer()
  let pres = automizer.importRootTemplate(`${templateFolder}RootTemplate.pptx`)
    .importTemplate(`${templateFolder}SlideWithShapes.pptx`, 'shapes')

  for(let i=0; i<=10; i++) {
    pres.addSlide('shapes', 1)
  }

  await pres.write(`${outputFolder}myPresentation.pptx`)

  expect(pres).toBeInstanceOf(Automizer)
})
