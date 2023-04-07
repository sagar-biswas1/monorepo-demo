const fs= require('fs');
const path= require('path');
const sass= require('sass');



/**
 *
 * @param {string}src src file
 * @param {string}output output file
 *
 */


const compile=(src,output)=>{
  const result=  sass.compile(path.resolve(src),{
        style:"expanded",
        verbose: true,
    })

    fs.writeFileSync(path.resolve(output),result.css)
}

//compile global css.
compile("src/global.scss","lib/global.css")



/**
 * get all components from atoms, molecules and organisms
 * @param Object[] array of objects containing src and output
 *
 */


const getComponents=()=>{
  let allComponents=[];
  const types=['atoms','molecules',"organisms"]

  types.forEach((type)=>{
    const allFiles=fs.readdirSync(`src/${type}`).map((file)=>({
src:`src/${type}/${file}`,
output:`lib/${file.slice(0,-5)}.css`
    }))

    allComponents=[...allComponents,...allFiles]
  })

  return allComponents
}

getComponents().forEach((component)=>compile(component.src, component.output))