document.getElementById('btnCalcular').addEventListener('click', function() {
    let expr = document.getElementById('expression').value;
    let variables = {};
    let pasos = [];
    
    // Dividir la expresión en partes por operadores
    let tokens = expr.split(/([+\-*/])/); // Operadores matemáticos: +, -, *, /
    
    for (let i = 0; i < tokens.length; i += 2) {
        let variable = tokens[i].trim();  // Los operandos
        if (!(variable in variables)) {
            variables[variable] = prompt(`Ingresa el valor para ${variable}:`);  // Asignar valores a las variables
        }
        tokens[i] = variables[variable];  // Reemplazar la variable por su valor
    }

    // Resolver la expresión paso por paso
    let resultado = eval(tokens[0]);  // Inicializar con el primer valor
    pasos.push(`Paso 1: ${tokens[0]} = ${resultado}`);

    for (let i = 1; i < tokens.length; i += 2) {
        let operador = tokens[i];       // Operador (+, -, *, /)
        let valor = tokens[i + 1];      // Operando siguiente
        let rAnterior = resultado;
        resultado = eval(`${resultado} ${operador} ${valor}`);
        pasos.push(`Paso ${Math.ceil(i / 2) + 1}: ${rAnterior} ${operador} ${valor} = ${resultado}`);
    }

    // Mostrar resultados
    document.getElementById('resultados').innerHTML = pasos.join('<br>');
});
