/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='BaseController.ts'/>

module StructureST
{
    /**
     * The UndoManager...
     *
     * @class UndoManager
     * @module StructureTS
     * @submodule controller
     * @constructor
     * @version 0.1.0
     **/
    export class UndoManager extends BaseController
    {
        /**
         * @overridden BaseController.CLASS_NAME
         */
        public CLASS_NAME:string = 'UndoManager';

        constructor()
        {
//https://github.com/danielwanja/UndoManager/blob/master/src/managed/UndoManager.as
            //https://code.google.com/p/moonshineproject/source/browse/trunk/ide/src/com/moonshineproject/text/UndoManager.as?r=816
        }

        /**
         * Indicates whether there is currently an operation that can be redone.
         *
         * @method canRedo
         * @public
         */
        public canRedo():boolean
        {

        }

        /**
         * Indicates whether there is currently an operation that can be undone.
         *
         * @method canUndo
         * @public
         */
        public canUndo():boolean
        {

        }

        /**
         * Clears both the undo and the redo histories.
         *
         * @method clearAll
         * @public
         */
        public clearAll():void
        {

        }

        /**
         * Clears the redo stack.
         * @method clearRedo
         * @public
         */
        public clearRedo():void
        {

        }

        /**
         * Returns the next operation to be redone.
         * @method peekRedo
         * @public
         */
        public peekRedo():IOperation
        {

        }

        /**
         * Returns the next operation to be undone.
         *
         * @method peekUndo
         * @public
         */
        public peekUndo():IOperation
        {

        }

        /**
         * Removes the next operation to be redone from the redo stack, and returns it.
         *
         * @method popRedo
         * @public
         */
        public popRedo():IOperation
        {

        }

        /**
         * Removes the next operation to be undone from the undo stack, and returns it.
         *
         * @method popUndo
         * @public
         */
        public popUndo():IOperation
        {

        }

        /**
         * Adds a redoable operation to the redo stack.
         *
         * @method adsf
         * @public
         */
        public pushRedo(operation:IOperation):void
        {

        }

        /**
         * Adds an undoable operation to the undo stack.
         *
         * @method pushUndo
         * @public
         */
        public pushUndo(operation:IOperation):void
        {

        }

        /**
         * Removes the next IOperation object from the redo stack and calls the performRedo() function of that object.
         *
         * @method redo
         * @public
         */
        public redo():void
        {

        }

        /**
         * Removes the next IOperation object from the undo stack and calls the performUndo() function of that object.
         *
         * @method undo
         * @public
         */
        public undo():void
        {

        }

    }
}

///**
// * UndoManager.js
// *
// * Copyright 2009, Moxiecode Systems AB
// * Released under LGPL License.
// *
// * License: http://tinymce.moxiecode.com/license
// * Contributing: http://tinymce.moxiecode.com/contributing
// */
//
//(function(tinymce) {
//    /**
//     * This class handles the undo/redo history levels for the editor. Since the build in undo/redo has major drawbacks a custom one was needed.
//     * @class tinymce.UndoManager
//     */
//    tinymce.create('tinymce.UndoManager', {
//        index : 0,
//        data : null,
//        typing : 0,
//
//        /**
//         * Constructs a new UndoManager instance.
//         *
//         * @constructor
//         * @method UndoManager
//         * @param {tinymce.Editor} ed Editor instance to undo/redo in.
//         */
//        UndoManager : function(ed) {
//            var t = this, Dispatcher = tinymce.util.Dispatcher;
//
//            t.editor = ed;
//            t.data = [];
//            t.onAdd = new Dispatcher(this);
//            t.onUndo = new Dispatcher(this);
//            t.onRedo = new Dispatcher(this);
//        },
//
//        /**
//         * Adds a new undo level/snapshot to the undo list.
//         *
//         * @method add
//         * @param {Object} l Optional undo level object to add.
//         * @return {Object} Undo level that got added or null it a level wasn't needed.
//         */
//        add : function(l) {
//            var t = this, i, ed = t.editor, b, s = ed.settings, la;
//
//            l = l || {};
//            l.content = l.content || ed.getContent({format : 'raw', no_events : 1});
//
//            // Add undo level if needed
//            l.content = l.content.replace(/^\s*|\s*$/g, '');
//            la = t.data[t.index > 0 && (t.index == 0 || t.index == t.data.length) ? t.index - 1 : t.index];
//            if (!l.initial && la && l.content == la.content)
//                return null;
//
//            // Time to compress
//            if (s.custom_undo_redo_levels) {
//                if (t.data.length > s.custom_undo_redo_levels) {
//                    for (i = 0; i < t.data.length - 1; i++)
//                        t.data[i] = t.data[i + 1];
//
//                    t.data.length--;
//                    t.index = t.data.length;
//                }
//            }
//
//            if (s.custom_undo_redo_restore_selection && !l.initial) {
//                //l.bookmark = b = l.bookmark || ed.selection.getBookmark();
//                l.content = ed.getContent({format : 'raw', no_events : 1});
//            }
//
//            if (t.index < t.data.length)
//                t.index++;
//
//            // Only initial marked undo levels should be allowed as first item
//            // This to workaround a bug with Firefox and the blur event
//            if (t.data.length === 0 && !l.initial)
//                return null;
//
//            // Add level
//            t.data.length = t.index + 1;
//            t.data[t.index++] = l;
//
//            if (l.initial)
//                t.index = 0;
//
//            // Set initial bookmark use first real undo level
//            if (t.data.length == 2 && t.data[0].initial)
//                t.data[0].bookmark = b;
//
//            t.onAdd.dispatch(t, l);
//            ed.isNotDirty = 0;
//
//            //console.dir(t.data);
//
//            return l;
//        },
//
//        /**
//         * Undoes the last action.
//         *
//         * @method undo
//         * @return {Object} Undo level or null if no undo was performed.
//         */
//        undo : function() {
//            var t = this, ed = t.editor, l = l, i;
//
//            if (t.typing) {
//                t.add();
//                t.typing = 0;
//            }
//
//            if (t.index > 0) {
//                // If undo on last index then take snapshot
//                if (t.index == t.data.length && t.index > 1) {
//                    i = t.index;
//                    t.typing = 0;
//
//                    if (!t.add())
//                        t.index = i;
//
//                    --t.index;
//                }
//
//                l = t.data[--t.index];
//                ed.setContent(l.content, {format : 'raw'});
//                ed.selection.moveToBookmark(l.bookmark);
//
//                t.onUndo.dispatch(t, l);
//            }
//
//            return l;
//        },
//
//        /**
//         * Redoes the last action.
//         *
//         * @method redo
//         * @return {Object} Redo level or null if no redo was performed.
//         */
//        redo : function() {
//            var t = this, ed = t.editor, l = null;
//
//            if (t.index < t.data.length - 1) {
//                l = t.data[++t.index];
//                ed.setContent(l.content, {format : 'raw'});
//                ed.selection.moveToBookmark(l.bookmark);
//
//                t.onRedo.dispatch(t, l);
//            }
//
//            return l;
//        },
//
//        /**
//         * Removes all undo levels.
//         *
//         * @method clear
//         */
//        clear : function() {
//            var t = this;
//
//            t.data = [];
//            t.index = 0;
//            t.typing = 0;
//            t.add({initial : true});
//        },
//
//        /**
//         * Returns true/false if the undo manager has any undo levels.
//         *
//         * @method hasUndo
//         * @return {boolean} true/false if the undo manager has any undo levels.
//         */
//        hasUndo : function() {
//            return this.index != 0 || this.typing;
//        },
//
//        /**
//         * Returns true/false if the undo manager has any redo levels.
//         *
//         * @method hasRedo
//         * @return {boolean} true/false if the undo manager has any redo levels.
//         */
//        hasRedo : function() {
//            return this.index < this.data.length - 1;
//        }
//    });
//})(tinymce);