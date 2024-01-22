window.onload = function () {

    let parado = document.getElementById("stationary"); //Obtengo valor en parado
    //console.log(parado);//Muestro por consola

    let disp1 = document.getElementById("aftShoot1");//Obtengo valor tras dispar
    //console.log(disp1);//Muestro por consola

    let movimiento = document.getElementById("moving");//Obtengo valor en movimiento
    //console.log(movimiento);//Muestro por consola

    let disp2 = document.getElementById("aftShoot2");//Obtengo valor tras disparar en movimiento
    //console.log(disp2);//Muestro por consola

    let detect = document.getElementById("spotting");

    /**
     * Función que comprueba que los datos recibidos sean tipo float
     * y no sean más de dos números decimales
     */
    function compruebaDatos() {
        
        let tablaGenerada = document.getElementById('tablaGenerada');
        while (tablaGenerada.firstChild) {
            tablaGenerada.removeChild(tablaGenerada.firstChild);
        }
        
        /**
         * Con esta función aseguro con una expresión regular que el número
         * recibido sea como espero
         */
        function validaNumero(valor) {
            let restriccion = /^\d+(\.\d{1,2})?|\d+(\,\d{1,2})?$/;
            return restriccion.test(valor);
        }

        //Quito los espacios en blanco por si los hubiese
        let paradoFloat = parado.value.trim();
        let disp1Float = disp1.value.trim();
        let movimientoFloat = movimiento.value.trim();
        let disp2Float = disp2.value.trim();
        let detectFloat = detect.value.trim();

        if (validaNumero(paradoFloat) && validaNumero(disp1Float) && validaNumero(movimientoFloat) && validaNumero(disp2Float) && validaNumero(detectFloat)) {

            paradoFloat = parseFloat(paradoFloat); //Compruebo que tengo todos los valores y los parseo a float
            disp1Float = parseFloat(disp1Float);
            movimientoFloat = parseFloat(movimientoFloat);
            disp2Float = parseFloat(disp2Float);
            detectFloat = parseFloat(detectFloat);

            console.log("Parado: " + paradoFloat); //Los muestro por consola
            console.log("Disparo parado: " + disp1Float);
            console.log("Movimiento: " + movimientoFloat);
            console.log("Disparo movimiento: " + disp2Float);
            console.log("Valor deteccion del vehículo: " + detectFloat);
            
            calculoCamuflaje();

        } else {
            alert("Introduce números válidos como: 12 o 12,32")
        }
        
        /**
         * Funcion que calcula el camuflaje en función del tipo de arbusto
         * sobre el que está a cubierto
         * P(PARADO) // F(Valor que va con disp1) //M (valor en movimiento) //F2 (Valor que va con disp2)
         */
        function calculoCamuflaje(){
            //Valores vehículo estacionario

            //let resultadoRedondeado = Math.round(camoF2);

            let cvs20Check = document.getElementById("cvs20").checked;
            let cvs15Check = document.getElementById("cvs15").checked;
            let cvsCheck = document.getElementById("cvsNull").checked;

            cvs20.addEventListener("change", actualizarTabla);
            cvs15.addEventListener("change", actualizarTabla);
            cvsNull.addEventListener("change", actualizarTabla);

            let cvsP = 1; //Sistema de Vision del Comandante (CVS) {P(arado)} y {M(ovimiento)}
            let cvsM = 1;

            if(cvs20Check){
                cvsP = 0.8;
                cvsM = 0.875;
            } else {
                if (cvs15Check){
                    cvsP = 0.85;
                    cvsM = 0.9; 
                } else{
                    cvsP = 1;
                    cvsM = 1;
                }
            }

            console.log("cvsP: " + cvsP + " cvsM: " + cvsM);

            function ajustarValorMinMax(valor) {
                return Math.min(Math.max(valor, 50), 445); // Establece el valor entre 50 y 445
            }
            
            let camo80P = Math.round(ajustarValorMinMax(detectFloat - ((paradoFloat/100) + 0.8 * cvsP) * (detectFloat-50)));
            let camo75P = Math.round(ajustarValorMinMax(detectFloat - ((paradoFloat/100) + 0.75 * cvsP) * (detectFloat-50)));
            let camo50P = Math.round(ajustarValorMinMax(detectFloat - ((paradoFloat/100) + 0.5 * cvsP) * (detectFloat-50)));
            let camo25P = Math.round(ajustarValorMinMax(detectFloat - ((paradoFloat/100) + 0.25 * cvsP) * (detectFloat-50)));
            let camoP = Math.round(ajustarValorMinMax(detectFloat - ((paradoFloat/100) + 0 * cvsP) * (detectFloat-50)));
            
            let camo80F1 = Math.round(ajustarValorMinMax(detectFloat - ((disp1Float/100) + 0.8 * cvsP) * (detectFloat-50)));
            let camo75F1 = Math.round(ajustarValorMinMax(detectFloat - ((disp1Float/100) + 0.75 * cvsP) * (detectFloat-50)));
            let camo50F1 = Math.round(ajustarValorMinMax(detectFloat - ((disp1Float/100) + 0.5 * cvsP) * (detectFloat-50)));
            let camo25F1 = Math.round(ajustarValorMinMax(detectFloat - ((disp1Float/100) + 0.25 * cvsP) * (detectFloat-50)));
            let camoF1 = Math.round(ajustarValorMinMax(detectFloat - ((disp1Float/100) + 0 * cvsP) * (detectFloat-50)));
            
            let camo80M = Math.round(ajustarValorMinMax(detectFloat - ((movimientoFloat/100) * cvsM + 0.8 * cvsP) * (detectFloat-50)));
            let camo75M = Math.round(ajustarValorMinMax(detectFloat - ((movimientoFloat/100) * cvsM + 0.75 * cvsP) * (detectFloat-50)));
            let camo50M = Math.round(ajustarValorMinMax(detectFloat - ((movimientoFloat/100) * cvsM + 0.5 * cvsP) * (detectFloat-50)));
            let camo25M = Math.round(ajustarValorMinMax(detectFloat - ((movimientoFloat/100) * cvsM + 0.25 * cvsP) * (detectFloat-50)));
            let camoM = Math.round(ajustarValorMinMax(detectFloat - ((movimientoFloat/100) * cvsM + 0 * cvsP) * (detectFloat-50)));
            
            let camo80F2 = Math.round(ajustarValorMinMax(detectFloat - ((disp2Float/100) * cvsM + 0.8 * cvsP) * (detectFloat-50)));
            let camo75F2 = Math.round(ajustarValorMinMax(detectFloat - ((disp2Float/100) * cvsM + 0.75 * cvsP) * (detectFloat-50)));
            let camo50F2 = Math.round(ajustarValorMinMax(detectFloat - ((disp2Float/100) * cvsM + 0.5 * cvsP) * (detectFloat-50)));
            let camo25F2 = Math.round(ajustarValorMinMax(detectFloat - ((disp2Float/100) * cvsM + 0.25 * cvsP) * (detectFloat-50)));
            let camoF2 = Math.round(ajustarValorMinMax(detectFloat - ((disp2Float/100) * cvsM + 0 * cvsP) * (detectFloat-50)));



            let resultados = {
                camo80P, camo75P, camo50P, camo25P, camoP,
                camo80F1, camo75F1, camo50F1, camo25F1, camoF1,
                camo80M, camo75M, camo50M, camo25M, camoM,
                camo80F2, camo75F2, camo50F2, camo25F2, camoF2}         
                
                for (let camo in resultados) {
                    resultados[camo] = Math.round(resultados[camo]);
                }

                let tablas = {
                    'Parado': [],
                    'ParadoDisparo (15M TRAS ARBUSTO)': [],
                    'Movimiento': [],
                    'MovimientoDisparo': [],
                    'Camuflaje': []
                };
                
                // Llenar las tablas con los datos
                for (let camo in resultados) {

                    let tipo = '';

                    if (camo.includes('P')) {
                        tipo = 'Parado';        
                    } else if (camo.includes('F1')) {
                        tipo = 'ParadoDisparo (15M TRAS ARBUSTO)';                 
                    } else if (camo.includes('M')) {
                        tipo = 'Movimiento';                       
                    } else if (camo.includes('F2')) {
                        tipo = 'MovimientoDisparo';                       
                    } else {
                        tipo = 'Camuflaje';
                    }
            
                    tablas[tipo].push(`<tr><td>${camo}</td><td>${resultados[camo]}</td></tr>`);
                }
            
                // Crear y agregar tablas al documento HTML
                for (let tipo in tablas) {
                    if (tipo !== 'Camuflaje') {
                        let table = document.createElement('table');
                        table.border = "3";
                        
                        //table.classList.add(tipo.toLowerCase());//Le añade la clase segun su tipo para poder modificar su CSS
                        
                        let claseCSS = tipo.toLowerCase().replace(/[\s_()]+/g, ''); // Reemplaza espacios, guiones bajos y paréntesis con nada
                        table.classList.add(claseCSS);

                        let thead = table.createTHead();
                        let row = thead.insertRow(0);
                        row.insertCell(0).innerHTML = "Camuflaje";
                        row.insertCell(1).innerHTML = tipo;
    
                        let tbody = table.createTBody();
                        //tbody.innerHTML = tablas[tipo].join('');

                        // Modifica la creación de filas para aplicar estilos al segundo td
                        for (let i = 0; i < tablas[tipo].length; i++) {
                            let tr = document.createElement('tr');
                            tr.innerHTML = tablas[tipo][i];

                            // Asegúrate de que haya al menos dos celdas en cada fila
                            if (tr.cells.length >= 2) {
                                tr.cells[1].classList.add('segundo-td-estilo'); // Agrega la clase al segundo td
                            }

                            tbody.appendChild(tr);
                        }
    
                        table.style.display = "inline-block";
                        // Agregar la tabla al documento
                        document.getElementById('tablaGenerada').appendChild(table);
                    }
                }
        }
    }

    function actualizarTabla() {
        compruebaDatos();
    }

    document.querySelector("button").addEventListener("click",function(event){
        event.preventDefault(); //Evito que se envie automaticamente el formulario
        compruebaDatos(); //Le asigno al botón del HTML que cuando presione, me compruebe todo y cree los resultados
    });  
}