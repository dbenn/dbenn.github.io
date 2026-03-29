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
 * 
 * References:
 * - http://www.tutorialspark.com/jqueryUI/jQuery_UI_Menu_Events.php
 */

// TODO:
// - tested with Chrome and Safari; need to test with Firefox and IE
// - add textboxes, buttons for dialogs
// - use set interval to show canvas update

var acejs = {
    menu_index: 1,
    wdw_index: 1,
    dialog_index: 1,

    _init: function () {
        $("body").prepend(
                '<div id="prelude_div"></div>' +
                '<table>' +
                '  <tr id="ui_row">' +
                '    <td>' +
                '      <div id="canvas_accordion"></div>' +
                '    </td>' +
                '  </tr>' +
                '</table>' +
                '<div id="dialog_div"></div>');

        init();

        $("#canvas_accordion").accordion();
    },

    // Set the title text.
    title: function (title) {
        $("title").text(title);
    },

    // Add specified HTML elements to the document body.
    header: function () {
        for (var i = 0; i < arguments.length; i++) {
            $("#prelude_div").append(arguments[i]);
        }
    },

    // Return the supplied text wrapped in a heading of the specified size. 
    heading: function (text, size) {
        return '<h' + size + '>' + text + '</h' + size + '>';
    },

    // Create and return an image element.
    image: function (url, height, width) {
        var img = '<image src="' + url + '"';
        if (height !== undefined) {
            image += ' height="' + height + '"';
        }
        if (width !== undefined) {
            image += ' width="' + width + '"';
        }
        img += '/>';
        return img;
    },

    // Create and return a link.
    link: function (text, url, new_tab) {
        var href = '<a href="' + url + '" ';
        if (new_tab) {
            href += 'target="_blank"';
        }
        href += '>' + text + '</a>';
        return href;
    },

    // Wraps arguments in a paragraph element and returns it.
    para: function () {
        var p = '<p>';
        for (var i in arguments) {
            p += arguments[i];
        }
        p += '</p>';
        return p;
    },

    // Set a background image.
    bgimage: function (url) {
        document.body.style.background =
                "#f3f3f3 url('" + url + "') no-repeat left top";
    },

    // Add a menu and items along with a menu handler that matches 
    // selected items to invoke callbacks.
    menu: function (name, items) {
        var menu_div = $('<td><div id="menu_div1' + this.menu_index + '"></div></td>');
        $("#ui_row").append(menu_div);

        var menu_id = "menu" + this.menu_index;
        var menu_elt = $('<ul id="' + menu_id + '"></ul>');

        menu_elt.append($('<li>').append('<div><h5>' + name));

        for (var i = 0; i < items.length; i++) {
            title = items[i][0];
            menu_elt.append($('<li>').
                    append('<div><a href="#">' + title));
        }

        menu_div.append(menu_elt);

        $("#" + menu_id).menu({
            select: function (event, ui) {
                for (var index = 0; index < items.length; index++) {
                    var target = items[index][0];
                    var text = ui.item.text();
                    if (target === text) {
                        // Invoke the target menu item's callback.
                        items[index][1]();
                        break;
                    }
                }
            }
        });

        this.menu_index++;
        return menu_id;
    },

    // Create a window (a canvas) within a selectable group.
    window: function (name, width, height) {
        var wdw_id = "window" + this.wdw_index;

        var canvas_accordian = $("#canvas_accordion");

        canvas_accordian.append($('<p>').text(name));

        canvas_elt = $('<canvas id="' + wdw_id +
                '" width="' + width +
                '" height=' + height +
                '" style="border:3px solid #d3d3d3;">');
        canvas_accordian.append(canvas_elt);

        this.wdw_index++;
        return wdw_id;
    },

    // Build the elements for and show a dialog.
    dialog: function () {
        var dialog_id = "dialog" + this.dialog_index;
        if (arguments.length >= 1) {
            var title = arguments[0];

            var dialog_elt = $('<div id="' + dialog_id +
                    '" class="dialog"' + 'title="' + title + '">');

            for (var i = 1; i < arguments.length; i++) {
                dialog_elt.append(arguments[i]);
            }

            $("#dialog_div").append(dialog_elt);
            $("#" + dialog_id).dialog();
        }
        // TODO: on close, delete dialog elements from div?
    },

    // Clear the specified window to the specified colour.
    clear: function (wdw_id, color) {
        if (color === undefined) {
            color = "black";
        }
        var canvas = $("#" + wdw_id)[0];
        var context = canvas.getContext("2d");
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    },

    // Set a pixel in the specified window to the specified colour.
    pset: function (wdw_id, x, y, color) {
        var canvas = $("#" + wdw_id)[0];
        var context = canvas.getContext("2d");
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
    }
};