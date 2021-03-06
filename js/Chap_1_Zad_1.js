var gl;
var shaderProgram;
var vertexBuffer;
// установка шейдеров
function initShaders() {
// получаем шейдеры
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
    //создаем объект программы шейдеров
    shaderProgram = gl.createProgram();
    // прикрепляем к ней шейдеры
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // связываем программу с контекстом webgl
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалсь установить шейдеры");
    }
    gl.useProgram(shaderProgram);
// установка атрибута программы
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
// установка атрибута программы
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}
// Функция создания шейдера по типу и id источника в структуре DOM
function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;
// создаем шейдер по типу
    var shader = gl.createShader(type);
// установка источника шейдера
    gl.shaderSource(shader, source);
// установка источника шейдера
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
// установка буфера вершин
function initBuffers() {
    // установка буфера вершин
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // массив координат вершин объекта
    var triangleVertices = [
        0.0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
        0.5, -0.5,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    // указываем кол-во точек
    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 3;
}
// отрисовка
function draw() {
// установка области отрисовки
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // указываем, что каждая вершина имеет по три координаты (x, y, z)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    // отрисовка примитивов - треугольников
    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
window.onload=function(){
    // отрисовка примитивов - треугольников
    var canvas = document.getElementById("canvas3D");
    try {
        // Сначала пытаемся получить стандартный контекст WegGL
        // Если не получится, обращаемся к экспериментальному контексту
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}
    // Если контекст не удалось получить, выводим сообщение
    if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
    }
    if(gl){
// установка размеров области рисования
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
// установка размеров области рисования
        initShaders();
// установка буфера вершин
        initBuffers();
// покрасим фон в бледно-розовый цвет
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
// отрисовка сцены
        draw();
    }
}