YUI.add('editor-tab', function(Y) {

    /**
     * Handles tab and shift-tab indent/outdent support.
     * @module editor
     * @submodule editor-tab
     */     
    /**
     * Handles tab and shift-tab indent/outdent support.
     * @class EditorTab
     * @constructor
     * @extends Base
     * @namespace Plugin
     */
    
    var EditorTab = function() {
        EditorTab.superclass.constructor.apply(this, arguments);
    }, HOST = 'host';

    Y.extend(EditorTab, Y.Base, {
        /**
        * Listener for host's nodeChange event and captures the tabkey interaction.
        * @private
        * @method _onNodeChange
        * @param {Event} e The Event facade passed from the host.
        */
        _onNodeChange: function(e) {
            var action = 'indent';

            if (e.changedType === 'tab') {
                if (!e.changedNode.test('li, li *')) {
                    e.changedEvent.halt();
                    e.preventDefault();
                    if (e.changedEvent.shiftKey) {
                        action = 'outdent';
                    }

                    this.get(HOST).execCommand(action, '');
                }
            }
        },
        initializer: function() {
            this.get(HOST).on('nodeChange', Y.bind(this._onNodeChange, this));
        }
    }, {
        /**
        * editorTab
        * @property NAME
        * @static
        */
        NAME: 'editorTab',
        /**
        * tab
        * @property NS
        * @static
        */
        NS: 'tab',
        ATTRS: {
            host: {
                value: false
            }
        }
    });


    Y.namespace('Plugin');

    Y.Plugin.EditorTab = EditorTab;


}, '@VERSION@' ,{skinnable:false, requires:['editor-base']});
