/* 
 * The MIT License
 *
 * Copyright 2017 David Benn.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE. 
 */

var wdw_id, data;

function init() {
    acejs.title("Iterated Function System");

    acejs.header(acejs.heading("Iterated Function System", 3));

    acejs.menu("Project", [
        ["Sierpinski Triangle", sierpinski],
        ["Square", square],
        ["Fern", fern],
        ["Tree #1", tree1],
        ["Tree #2", tree2],
        ["Sunflower", sunflower],
        ["About...", about]
    ]);

    wdw_id = acejs.window("IFS", 640, 400);

    acejs.clear(wdw_id);
}

function sierpinski() {
    data = {};
    data.n = 3;
    data.xscale = 300;
    data.yscale = 320;
    data.xoffset = 20;
    data.yoffset = -150;
    data.a = [0.5, 0.5, 0.5];
    data.b = [0, 0, 0];
    data.c = [0, 0, 0];
    data.d = [0.5, 0.5, 0.5];
    data.e = [0, 1, 0.5];
    data.f = [0, 0, 0.5];
    data.p = [0.33, 0.66, 1];
    iterate(data, 'white');
}

function square() {
    data = {};
    data.n = 4;
    data.xscale = 300;
    data.yscale = 320;
    data.xoffset = 170;
    data.yoffset = -160;
    data.a = [0.5, 0.5, 0.5, 0.5];
    data.b = [0, 0, 0, 0];
    data.c = [0, 0, 0, 0];
    data.d = [0.5, 0.5, 0.5, 0.5];
    data.e = [0, 0.5, 0, 0.5];
    data.f = [0, 0, 0.5, 0.5];
    data.p = [0.25, 0.5, 0.75, 1];
    iterate(data, 'blue');
}

function fern() {
    data = {};
    data.n = 4;
    data.xscale = 75;
    data.yscale = 36;
    data.xoffset = 285;
    data.yoffset = -180;
    data.a = [0, 0.2, -0.15, 0.85];
    data.b = [0, -0.26, 0.28, 0.04];
    data.c = [0, 0.23, 0.26, -0.04];
    data.d = [0.16, 0.22, 0.24, 0.85];
    data.e = [0, 0, 0, 0];
    data.f = [0, 1.6, 0.44, 1.6];
    data.p = [0.01, 0.08, 0.15, 1];
    iterate(data, 'green');
}

function sunflower() {
    data = {};
    data.n = 4;
    data.xscale = 45;
    data.yscale = 45;
    data.xoffset = 240;
    data.yoffset = -80;
    data.a = [-0.3, -0.3, 0.02, 0];
    data.b = [-0.6, -1, 0.01, 0.02];
    data.c = [1.1, 1, 0, 0];
    data.d = [0.11, 0.01, -0.2, 0];
    data.e = [4, 4, 0, 0.01];
    data.f = [0, 0, 0, 0.02];
    data.p = [0.02, 0.97, 0.98, 1];
    iterate(data, 'yellow');
}

function tree1() {
    data = {};
    data.n = 4;
    data.xscale = 900;
    data.yscale = 450;
    data.xoffset = 320;
    data.yoffset = -100;
    data.a = [0, 0.1, 0.42, 0.42];
    data.b = [0, 0, -0.42, 0.42];
    data.c = [0, 0, 0.42, -0.42];
    data.d = [0.5, 0.1, 0.42, 0.42];
    data.e = [0, 0, 0, 0];
    data.f = [0, 0.2, 0.2, 0.2];
    data.p = [0.05, 0.2, 0.6, 1];
    iterate(data, 'saddlebrown');
}

function tree2() {
    data = {};
    data.n = 4;
    data.xscale = 280;
    data.yscale = 140;
    data.xoffset = 50;
    data.yoffset = -130;
    data.a = [0.195, 0.462, -0.058, -0.045];
    data.b = [-0.488, 0.414, -0.07, 0.091];
    data.c = [0.344, -0.252, 0.453, -0.469];
    data.d = [0.443, 0.361, -0.111, -0.022];
    data.e = [0.722, 0.538, 1.125, 0.863];
    data.f = [0.536, 1.167, 0.185, 0.871];
    data.p = [0.25, 0.5, 0.75, 1];
    iterate(data, 'sienna');
}

function about() {
    acejs.dialog('About IFS',
            acejs.para('Iterated Function System'),
            acejs.para(acejs.link('Ported', 'https://bitbucket.org/snippets/dbennau/op6n5'),
                    ' from ',
                    acejs.link('ACE BASIC', 'https://dbenn.wordpress.com/2014/05/04/basics-50th-early-micros-and-ace-basic-for-the-amiga/'),
                    ' to ACEjs &#169; David Benn (1994, 2017)'),
            acejs.para(acejs.image('http://www.users.on.net/~dbenn/images/ace.gif')),
            acejs.para('For Karen &#x2764'));
}

function iterate(data, pixelColor) {
    acejs.clear(wdw_id);

    var x = 0;
    var y = 0;
    var i = 1;
    var finished = false;
    do {
        var k = 0;
        var r = Math.random();
        if (r <= data.p[0]) {
            k = 0;
        } else if (r <= data.p[1]) {
            k = 1;
        } else if (r <= data.p[2]) {
            k = 2;
        } else {
            k = data.n - 1;
        }

        var newx = data.a[k] * x + data.b[k] * y + data.e[k];
        var newy = data.c[k] * x + data.d[k] * y + data.f[k];
        x = newx;
        y = newy;
        var outX = x * data.xscale + data.xoffset;
        var outY = 200 - (y * data.yscale + data.yoffset);

        acejs.pset(wdw_id, outX, outY, pixelColor);

        i++;
    } while (i <= 75000 && !finished);
}