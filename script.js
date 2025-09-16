// Definimos todas las recetas con sus ingredientes y cantidades (en gramos o ml)
const recetas = {
    basico: {
        nombre: "Pan Básico",
        ingredientes: [
            { nombre: "Harina de arroz integral", cantidad: 200 },
            { nombre: "Harina de almendras", cantidad: 150 },
            { nombre: "Fécula de patata", cantidad: 50 },
            { nombre: "Goma xantana", cantidad: 10 },
            { nombre: "Sal", cantidad: 5 },
            { nombre: "Levadura seca instantánea", cantidad: 10 },
            { nombre: "Agua tibia", cantidad: 240 },
            { nombre: "Aceite de oliva", cantidad: 60 },
            { nombre: "Huevos grandes", cantidad: 100 }
        ]
    },
    avena: {
        nombre: "Pan de Avena",
        ingredientes: [
            { nombre: "Harina de avena sin gluten", cantidad: 200 },
            { nombre: "Harina de almendras", cantidad: 100 },
            { nombre: "Fécula de patata", cantidad: 50 },
            { nombre: "Goma xantana", cantidad: 10 },
            { nombre: "Levadura seca instantánea", cantidad: 7 },
            { nombre: "Sal", cantidad: 5 },
            { nombre: "Agua tibia", cantidad: 250 },
            { nombre: "Aceite de coco", cantidad: 50 },
            { nombre: "Huevos grandes", cantidad: 100 }
        ]
    },
    almendras: {
        nombre: "Pan de Almendras",
        ingredientes: [
            { nombre: "Harina de almendra", cantidad: 300 },
            { nombre: "Harina de coco", cantidad: 100 },
            { nombre: "Goma xantana", cantidad: 10 },
            { nombre: "Levadura seca instantánea", cantidad: 7 },
            { nombre: "Sal", cantidad: 5 },
            { nombre: "Agua tibia", cantidad: 250 },
            { nombre: "Aceite de oliva extra virgen", cantidad: 50 },
            { nombre: "Huevos grandes", cantidad: 150 }
        ]
    },
    platano: {
        nombre: "Pan de Plátano",
        ingredientes: [
            { nombre: "Harina de almendras", cantidad: 200 },
            { nombre: "Harina de coco", cantidad: 50 },
            { nombre: "Goma xantana", cantidad: 10 },
            { nombre: "Levadura química (sin gluten)", cantidad: 5 },
            { nombre: "Bicarbonato de sodio", cantidad: 5 },
            { nombre: "Sal", cantidad: 5 },
            { nombre: "Plátanos medianos muy maduros", cantidad: 300 },
            { nombre: "Aceite de coco", cantidad: 80 },
            { nombre: "Huevos grandes", cantidad: 100 },
            { nombre: "Extracto de vainilla (opcional)", cantidad: 5 }
        ]
    },
    avena_manzana: {
        nombre: "Pan de Avena y Manzana",
        ingredientes: [
            { nombre: "Harina de avena sin gluten", cantidad: 200 },
            { nombre: "Harina de almendras", cantidad: 150 },
            { nombre: "Goma xantana", cantidad: 10 },
            { nombre: "Levadura seca instantánea", cantidad: 7 },
            { nombre: "Sal", cantidad: 5 },
            { nombre: "Agua tibia", cantidad: 240 },
            { nombre: "Aceite de coco", cantidad: 50 },
            { nombre: "Huevos", cantidad: 100 },
            { nombre: "Manzana rallada", cantidad: 150 }
        ]
    }
};

function actualizarIngredientes() {
    const selectReceta = document.getElementById('receta');
    const container = document.getElementById('ingredientes-container');
    const lista = document.getElementById('lista-ingredientes');
    
    if (selectReceta.value === "") {
        container.style.display = 'none';
        document.getElementById('resultados').style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    // Limpiar lista anterior
    lista.innerHTML = '';
    
    const recetaSeleccionada = recetas[selectReceta.value];
    
    // Crear inputs para cada ingrediente
    recetaSeleccionada.ingredientes.forEach(ing => {
        const div = document.createElement('div');
        div.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = `${ing.nombre} (${ing.cantidad}g):`;
        label.htmlFor = `ing_${ing.nombre.replace(/ /g, '_')}`;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `ing_${ing.nombre.replace(/ /g, '_')}`;
        input.placeholder = `₲ por kg`;
        input.value = '0';
        input.min = '0';
        input.step = '100';
        
        div.appendChild(label);
        div.appendChild(input);
        lista.appendChild(div);
    });
}

function calcular() {
    const selectReceta = document.getElementById('receta');
    if (selectReceta.value === "") {
        alert("¡Por favor, selecciona una receta primero!");
        return;
    }
    
    const receta = recetas[selectReceta.value];
    let costoIngredientes = 0;
    
    // Calcular costo de ingredientes
    receta.ingredientes.forEach(ing => {
        const inputId = `ing_${ing.nombre.replace(/ /g, '_')}`;
        const precioPorKg = parseFloat(document.getElementById(inputId).value) || 0;
        const cantidadKg = ing.cantidad / 1000; // Convertir gramos a kg
        const costoIngrediente = precioPorKg * cantidadKg;
        costoIngredientes += costoIngrediente;
    });
    
    // Sumar costos indirectos
    const energia = parseFloat(document.getElementById('energia').value) || 0;
    const envases = parseFloat(document.getElementById('envases').value) || 0;
    const otros = parseFloat(document.getElementById('otros').value) || 0;
    const margen = parseFloat(document.getElementById('margen').value) || 0;
    
    const costoProduccion = costoIngredientes + energia + envases + otros;
    const precioVenta = costoProduccion * (1 + margen / 100);
    
    // Mostrar resultados
    document.getElementById('costo-ingredientes').textContent = `₲ ${Math.round(costoIngredientes).toLocaleString('es-PY')}`;
    document.getElementById('costo-produccion').textContent = `₲ ${Math.round(costoProduccion).toLocaleString('es-PY')}`;
    document.getElementById('precio-venta').textContent = `₲ ${Math.round(precioVenta).toLocaleString('es-PY')}`;
    
    document.getElementById('resultados').style.display = 'block';
    
    // Scroll suave hasta los resultados
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
}
