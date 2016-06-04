/**
 * VERSION: 3.0
 * DATE: 
 * JS
 * AUTHOR: Ian Duff
 * COPYRIGHT: Essemble Ltd
 * All code © 2016 Essemble Ltd. all rights reserved
 * This code is the property of Essemble Ltd and cannot be copied, reused or modified without prior permission
 **/

    function getQueryVariable(variable) {
        var query = location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return unescape(pair[1]);
            }
        }
        return false;
    }

    function Glossary(vars) {
        //constructor
        this._element = vars.element;
        this._screen = vars.element._screen;
        this._container = vars.element._container;
        this._xml = vars.element._xml;

        //Glossary default settings
        this._letterWidth = 40;
        this._letterHeight = 30;
        this._letterPadding = 1;
        this._letterBgTint = "transparent";
        this._letterBgRolloverTint = "transparent";
        this._letterTextRolloverTint = "#FFA2AD";
        this._letterBgSelectedTint = "#FFA2AD";
        this._letterTextSelectedTint = "#FFA2AD";
        this._wordBgTint = "transparent";
        this._wordBgRolloverTint = "transparent";
        this._wordTextRolloverTint = "#FFA2AD";
        this._wordBgSelectedTint = "transparent";
        this._wordTextSelectedTint = "#FFA2AD";
        this._tintAmount = 1;
        this._noWordTintAmount = 0.3;
        this._allWords = [];
        this._useDropDownForWords = false;

        //array of letter objects
        this._arLetters = [];

        //read the settings
        /*
        <settings letterWidth="40" letterHeight="30" letterPadding="1" letterBgTint="transparent" letterBgRolloverTint="transparent" letterTextRolloverTint="FFA2AD" letterBgSelectedTint="transparent" letterTextSelectedTint="FFA2AD" wordBgTint="transparent" wordBgRolloverTint="transparent" wordTextRolloverTint="FFA2AD" wordBgSelectedTint="transparent" wordTextSelectedTint="FFA2AD" tintAmount="1" useDropDownForWords="true"/>
        */

        var settings = this._xml.find("settings");
        if (settings.length > 0) {
            if (xmlAttrNum(settings, "letterWidth")) this._letterWidth = parseInt(settings.attr("letterWidth"));
            if (xmlAttrNum(settings, "letterHeight")) this._letterHeight = parseInt(settings.attr("letterHeight"));
            if (xmlAttrNum(settings, "letterPadding")) this._letterPadding = parseInt(settings.attr("letterPadding"));
            if (xmlAttrNum(settings, "tintAmount")) this._tintAmount = settings.attr("tintAmount");
            if (xmlAttrStr(settings, "letterBgTint")) {
                var hex = checkColour(settings.attr("letterBgTint"));
                var rgbaStr = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + this._tintAmount + ")";
                this._letterBgTint = rgbaStr;
            }

            if (xmlAttrStr(settings, "letterBgRolloverTint")) {
                var hex = checkColour(settings.attr("letterBgRolloverTint"));
                var rgbaStr = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + this._tintAmount + ")";
                this._letterBgRolloverTint = rgbaStr;
            }

            if (xmlAttrStr(settings, "letterTextRolloverTint")) this._letterTextRolloverTint = checkColour(settings.attr("letterTextRolloverTint"));
            if (xmlAttrStr(settings, "letterBgSelectedTint")) {
                var hex = checkColour(settings.attr("letterBgSelectedTint"));
                var rgbaStr = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + this._tintAmount + ")";
                this._letterBgSelectedTint = rgbaStr;
            }
            if (xmlAttrStr(settings, "letterTextSelectedTint")) this._letterTextSelectedTint = checkColour(settings.attr("letterTextSelectedTint"));
            if (xmlAttrStr(settings, "wordBgTint")) {
                var hex = checkColour(settings.attr("wordBgTint"));
                var rgbaStr = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + this._tintAmount + ")";
                this._wordBgTint = rgbaStr;
            }
            if (xmlAttrStr(settings, "wordBgRolloverTint")) {
                var hex = checkColour(settings.attr("wordBgRolloverTint"));
                var rgbaStr = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + this._tintAmount + ")";
                this._wordBgRolloverTint = rgbaStr;
            }
            if (xmlAttrStr(settings, "wordTextRolloverTint")) this._wordTextRolloverTint = checkColour(settings.attr("wordTextRolloverTint"));
            if (xmlAttrStr(settings, "wordBgSelectedTint")) {
                var hex = checkColour(settings.attr("wordBgSelectedTint"));
                var rgbaStr = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + this._tintAmount + ")";
                this._wordBgSelectedTint = rgbaStr;
            }
            if (xmlAttrStr(settings, "wordTextSelectedTint")) this._wordTextSelectedTint = checkColour(settings.attr("wordTextSelectedTint"));
            if (xmlAttrStr(settings, "useDropDownForWords")) this._useDropDownForWords = Boolean(settings.attr("useDropDownForWords").toLowerCase() == "true");
        }
    }

    Glossary.prototype = {
            //Glossary methods
            populate: function() {
                var cr = 0;
                var count = 0;
                for (var i = 0; i < this._arLetters.length; i++) {
                    var oLetter = this._arLetters[i];
                    var letterMc = create({ type: "p", id: "glossLetter" + (oLetter.id), className: "glossaryLetter", innerHTML: oLetter.id });
                    oLetter.mc = letterMc; //reference the container as a property of the letter object
                    $(letterMc).data('oLetter', oLetter); //make the letter object a property of the container (allows access to the object on click)
                    $(letterMc).data('scope', this);
                    $(letterMc).css('position', 'relative');
                    $(letterMc).css('float', 'left');
                    $(letterMc).css('margin-right', this._letterPadding + "px");
                    $(letterMc).css('margin-bottom', this._letterPadding + "px");
                    $(letterMc).css('display', 'block');
                    $(letterMc).css('width', this._letterWidth);
                    $(letterMc).css('height', this._letterHeight);
                    $(letterMc).css('line-height', this._letterHeight - 2 + "px");
                    $(letterMc).css('cursor', "pointer");
                    //$(letterMc).css('left', (count * this._letterWidth) + (count * this._letterPadding));

                    //add background colour
                    $(letterMc).css('backgroundColor', this._letterBgTint);

                    //add to the letterHolder box
                    var letterHolder = this._screen.getElementById("letterHolder");
                    $(letterHolder._container).append(letterMc);

                    //remember the original css text colour (for rollouts)
                    var origTxtCol = $(letterMc).css('color');
                    $(letterMc).data('origTxtCol', origTxtCol);

                    //if at least one word exists for the letter, enable
                    oLetter.enabled ? this.enableLetter(letterMc) : this.letterNoWords(letterMc);

                    count++;
                }

                var letterQueryString = getQueryVariable("letter");
                var wordQueryString = getQueryVariable("word");

                if (letterQueryString) {
                    //show the first defined word of the defined letter
                    var l = this.getLetterObjByLetter(letterQueryString);
                    if (l) {
                        if (l.arWords[0]) {
                            this.showWords(l);
                            this.showDef(l.arWords[0]); //show the first word definition
                        } else {
                            this.loadFirstDefinition();
                        }
                    } else {
                        this.loadFirstDefinition();
                    }
                } else if (wordQueryString) {
                    //select the letter and word
                    //show the definition of the defined word
                    var w = this.getWordObjByWord(wordQueryString);
                    if (w) {
                        this.showWords(w.letter);
                        this.showDef(w);
                    } else {
                        this.loadFirstDefinition();
                    }
                } else {
                    this.loadFirstDefinition();
                }

                if (typeof(jQuery.Autocomplete) == "function") { this.initAutoSearch(); }
            },

            loadFirstDefinition: function() {
                //show the first defined word of the first defined letter
                var firstLetter;
                for (var i = 0; i < this._arLetters.length; i++) {
                    if (this._arLetters[i].arWords.length > 0) { firstLetter = i;
                        break; }
                }
                this.showWords(this._arLetters[firstLetter]);
                this.showDef(this._arLetters[firstLetter].arWords[0]); //show the first word definition
            },

            initAutoSearch: function() {
                var scope = this;

                $('#searchInput').autocomplete({
                    lookup: scope._allWords,
                    onSelect: function(suggestion) {
                        var w = scope.getWordObjByWord(suggestion.value);
                        scope.showWords(w.letter);
                        scope.showDef(w);
                        this.value = ""; //clear
                    }
                });
            },

            init: function() {
                //create the glossary letter objects
                var scope = this;
                var defHolderElement = get("definitionHolder");

                $(this._xml).find('letter').each(function() {
                    //create a letter object
                    var oLetter = {};
                    oLetter.id = $(this).attr("id");

                    oLetter.value = $(this).attr("id");

                    oLetter.enabled = false; //enabled if at least one word with an id exists in the letter node
                    oLetter.selected = false;
                    oLetter.arWords = [];

                    var wordCount = 0;
                    $(this).find('word').each(function() {
                        if ($(this).attr("id").length > 0) {
                            var oWord = { id: $(this).attr("id"), elements: [], definition: $(this).text(), selected: (wordCount == 0), letter: oLetter }
                            if ($(this).children().length > 0) {
                                $(this).children().each(function() {
                                    var el = new Element({ screen: scope._screen, xml: this });
                                    el._target = defHolderElement;
                                    oWord.elements.push(el);
                                })
                            }
                            oLetter.arWords.push(oWord);
                            oLetter.enabled = true;
                            scope._allWords.push($(this).attr("id")); //push to _allWords for autocomplete search
                            wordCount++;
                        }
                    })

                    scope.sortWordsAlphaNumerically(oLetter.arWords);
                    scope._arLetters.push(oLetter);
                });

                //kick off
                this.populate();
            },

            sortWordsAlphaNumerically: function(arWords) {
                var reA = /[^a-zA-Z]/g;
                var reN = /[^0-9]/g;
                arWords.sort(function(a, b) {
                    var aA = a.id.replace(reA, "").toLowerCase();
                    var bA = b.id.replace(reA, "").toLowerCase();
                    if (aA === bA) {
                        var aN = parseInt(a.id.replace(reN, ""), 10);
                        var bN = parseInt(b.id.replace(reN, ""), 10);
                        return aN === bN ? 0 : aN > bN ? 1 : -1;
                    } else {
                        return aA > bA ? 1 : -1;
                    }
                });
            },

            enableLetter: function(letterMc) {
                $(letterMc).off(); //remove all first
                $(letterMc).on("click", this.selectLetter);
                $(letterMc).on("mouseover", this.overLetter);
                $(letterMc).on("mouseout", this.outLetter);
                $(letterMc).css("cursor", "pointer");
            },

            disableLetter: function(letterMc) {
                $(letterMc).css("cursor", "default");
                $(letterMc).off();
            },

            letterNoWords: function(letterMc) {
                //no words exist for this letter
                //apply disabled state
                $(letterMc).css("cursor", "default");
                $(letterMc).css("opacity", this._noWordTintAmount);
                var animobj = { opacity: this._noWordTintAmount };
                $(letterMc).animate(animobj, { duration: 0 });
            },

            overLetter: function() {
                var scope = $(this).data("scope");
                $(this).css("backgroundColor", scope._letterBgRolloverTint);
                $(this).css("color", scope._letterTextRolloverTint);
            },

            outLetter: function() {
                var scope = $(this).data("scope");
                var origTxtCol = $(this).data("origTxtCol");
                var animobj = { backgroundColor: scope._letterBgTint, color: origTxtCol };
                $(this).animate(animobj, { duration: 500 });
            },

            selectLetter: function() {
                var scope = $(this).data("scope");
                var oLetter = $(this).data("oLetter");
                var letter = oLetter.id;
                scope.showWords(oLetter);
                scope.showDef(oLetter.arWords[0]);
            },

            selectedLetterColour: function(letterMc) {
                var animobj = { backgroundColor: this._letterBgSelectedTint, color: this._letterTextSelectedTint };
                $(letterMc).stop(true, false).animate(animobj, { duration: 0 });
            },

            unselectedLetterColour: function(letterMc) {
                var origTxtCol = $(letterMc).data("origTxtCol");
                var animobj = { backgroundColor: this._letterBgTint, color: origTxtCol };
                $(letterMc).stop(true, false).animate(animobj, { duration: 0.5 });
            },

            resetLetters: function() {
                for (var i = 0; i < this._arLetters.length; i++) {
                    var oLetter = this._arLetters[i];
                    if (oLetter.enabled) {
                        if (oLetter.selected) {
                            oLetter.selected = false;
                            this.enableLetter(oLetter.mc);
                            this.unselectedLetterColour(oLetter.mc);
                        }
                    }
                }
            },

            showWords: function(oLetter) {
                //remove selected state & re-apply mouse events to the previously selected letter
                this.resetLetters();

                //disable the selected letter
                this.disableLetter(oLetter.mc);

                //apply selected state to the selected letter
                this.selectedLetterColour(oLetter.mc);
                oLetter.selected = true;

                this._useDropDownForWords ? this.createDropdown(oLetter) : this.createWords(oLetter);
            },

            createWords: function(oLetter) {
                //empty the current word list
                var wordHolderElement = this._screen.getElementById("wordHolder");
                wordHolderElement._container.innerHTML = "";

                var count = 0;
                var yPad = 2;

                for (var i = 0; i < oLetter.arWords.length; i++) {
                    var oWord = oLetter.arWords[i];
                    var wordMc = create({ type: "p", id: oLetter.id + (count + 1), className: "glossaryWord", innerHTML: oWord.id });
                    $(wordMc).data("oWord", oWord); //make the word object a property of the element (allows access to the object on click)
                    $(wordMc).data("scope", this);

                    //position and cursor
                    $(wordMc).css("position", "relative");
                    $(wordMc).css("left", 1);
                    $(wordMc).css("margin-bottom", yPad);
                    $(wordMc).css('cursor', "pointer");

                    //add background colour
                    $(wordMc).css("backgroundColor", this._wordBgTint);

                    oWord.mc = wordMc; //reference the div as a property with the word object

                    //add to the wordHolder box
                    $(wordHolderElement._container).append(wordMc);
                    this.enableWord(wordMc);
                    count++;

                    //remember the original css text colour (for rollouts)
                    var origTxtCol = $(wordMc).css("color");
                    $(wordMc).data("origTxtCol", origTxtCol);
                }
            },
					//dropdown function	
            createDropdown: function(oLetter) {
                var dropDwn = create({ type: "select", id: "glossaryWordDropdown", className: "glossarySelect" });
                for (var i = 0; i < oLetter.arWords.length; i++) {
                    var oWord = oLetter.arWords[i];
                    $('<option />', { value: oWord.id, text: oWord.id }).appendTo(dropDwn);
                }
                $(dropDwn).on('change', this.onDropDown.bind(this));

                //add to the wordHolder box
                var wordHolderElement = this._screen.getElementById("wordHolder");
                wordHolderElement._container.innerHTML = "";
                $(wordHolderElement._container).append(dropDwn);
            },

            onDropDown: function(event) {
                var w = this.getWordObjByWord(event.currentTarget.value);
                this.showDef(w);
            },

            enableWord: function(wordMc) {
                $(wordMc).off(); //remove all first
                $(wordMc).on("click", this.selectWord);
                $(wordMc).on("mouseover", this.overWord);
                $(wordMc).on("mouseout", this.outWord);
                $(wordMc).css("cursor", "pointer");
            },

            disableWord: function(wordMc) {
                $(wordMc).css("cursor", "default");
                $(wordMc).off();
            },

            overWord: function() {
                var scope = $(this).data("scope");
                $(this).css("backgroundColor", scope._wordBgRolloverTint);
                $(this).css("color", scope._wordTextRolloverTint);
            },

            outWord: function() {
                var scope = $(this).data("scope");
                var origTxtCol = $(this).data("origTxtCol");
                var animobj = { backgroundColor: scope._wordBgTint, color: origTxtCol };
                $(this).stop(true, false).animate(animobj, { duration: 500 });
            },

            selectWord: function() {
                var oWord = $(this).data("oWord");
                var scope = $(this).data("scope");
                scope.showDef(oWord);
            },

            selectedWordColour: function(wordMc) {
                var animobj = { backgroundColor: this._wordBgSelectedTint, color: this._wordTextSelectedTint };
                $(wordMc).stop(true, false).animate(animobj, { duration: 0 });
            },

            unselectedWordColour: function(wordMc) {
                var origTxtCol = $(wordMc).data("origTxtCol");
                var animobj = { backgroundColor: this._wordBgTint, color: origTxtCol };
                $(wordMc).stop(true, false).animate(animobj, { duration: 500 });
            },

            resetWords: function(oLetter) {
                for (var i = 0; i < oLetter.arWords.length; i++) {
                    var oWord = oLetter.arWords[i];
                    if (oWord.selected) {
                        oWord.selected = false;
                        this.enableWord(oWord.mc);
                        this.unselectedWordColour(oWord.mc);
                    }
                }
            },

            showDef: function(oWord) {
                if (this._useDropDownForWords) {
                    var dd = get("glossaryWordDropdown");
                    for (var i = 0; i < dd.options.length; i++) {
                        if (dd.options[i].value == oWord.id) {
                            if (dd.selectedIndex != i) dd.selectedIndex = i;
                            break;
                        }
                    }
                } else {
                    //remove selected state & re-apply mouse events to the previously selected word
                    this.resetWords(oWord.letter);

                    //disable the selected word
                    this.disableWord(oWord.mc);

                    //apply selected state to the selected word
                    this.selectedWordColour(oWord.mc);
                    oWord.selected = true;
                }

                //populate the definition
                var defHolderElement = get("definitionHolder");
                defHolderElement.innerHTML = "";
                if (oWord.elements.length > 0) {
                    var loader = new ElementLoader({ screen: this._screen, elements: oWord.elements });
                    loader.load();
                } else {
                    defHolderElement.innerHTML = oWord.definition;
                }
            },

            getLetterObjByLetter: function(letter) {
                var ret = null;
                for (var i = 0; i < this._arLetters.length; i++) {
                    if (this._arLetters[i].id.toLowerCase() == letter.toLowerCase()) { ret = this._arLetters[i];
                        break; }
                }
                return ret;
            },

            getWordObjByWord: function(word) {
                var ret = null;
                for (var i = 0; i < this._arLetters.length; i++) {
                    for (var j = 0; j < this._arLetters[i].arWords.length; j++) {
                        if (this._arLetters[i].arWords[j].id.toLowerCase() == word.toLowerCase()) { ret = this._arLetters[i].arWords[j];
                            break; }
                    }
                }
                return ret;
            }
        } //end prototype object