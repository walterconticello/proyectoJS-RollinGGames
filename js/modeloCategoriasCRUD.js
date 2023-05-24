//
const lsCategoriasId = "categorias";

let categorias;
if(localStorage.getItem(lsCategoriasId) === null){
    categorias = [];
    localStorage.setItem(lsCategoriasId,JSON.stringify(categorias));
}
else{
    categorias = localStorage.getItem(lsCategoriasId);
    categorias = JSON.parse(categorias);
}


const crearCategoria = (categoria) => {
    categoria = categoria.toLowerCase().trim();
    if(!categorias.includes(categoria)){
        categorias.push(categoria);
        localStorage.setItem(lsCategoriasId,JSON.stringify(categorias));
        return "Categoria creada con éxito";
    }
    return "La categoría ya existe";
}

const borrarCategoria = (categoria) => {
    categoria = categoria.toLowerCase().trim();
    if(categorias.includes(categoria)){
        categorias.splice(categorias.indexOf(categoria), 1);
        localStorage.setItem(lsCategoriasId,JSON.stringify(categorias));
        return "Categoria borrada con éxito";
    }
    return "La categoría no existe";
}


export {categorias, crearCategoria, borrarCategoria};