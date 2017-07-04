$.fn.changePic = function(nRows, nCols, sMode, aPics, speed) {
    var obj = $(this);
    var aPigPath = aPics;
    var nCurPic = 0;
    var nW = obj.width();
    var nH = obj.height();
    var nCols = nCols;
    var nRows = nRows;
    var nItemW = nW / nCols;
    var nItemH = nH / nRows;
    var bIsAnimating = false;

    for (var i = 0; i < nRows; i++) {
        for (var j = 0; j < nCols; j++) {
            var oSpan = $('<span></span>');
            oSpan.css({
                width: nItemW + 'px',
                height: nItemH + 'px',
                left: j * nItemW + 'px',
                top: i * nItemH + 'px',
                'background-position': '-' + (j * nItemW) + 'px -' + (i * nItemH) + 'px'
            }).attr({
                'data-r': i,
                'data-c': j
            });
            // oSpan.appendTo('div');
            oSpan.appendTo(obj.parent());
        }
    }
    $(document).off('click');
    $(document).on('click', function(event) {
        if (bIsAnimating) {
            return; //如果正在进行动画，则点击无效（不能使用stop()，不然显示卡主
        }
        bIsAnimating = true;
        nCurPic++;
        var aSpan = $('span');

        aSpan.each(function(index) {
            var oSpan = $(this);
            var c = parseInt(oSpan.attr('data-c'));
            var r = parseInt(oSpan.attr('data-r'));
            var sum = r + c;
            var minColRow = Math.min(nRows, nCols);
            switch (sMode) {
                case 'mid-LDtoRU':
                    setTimerMidLDtoRU();
                    break;
                case 'mid-LUtoRD':
                    setTimerMidLUtoRD();
                    break;
                case 'LtoR':
                    setTimerLtoR();
                    break;
                case 'RtoL':
                    setTimerRtoL();
                    break;
                case 'TtoD':
                    setTimerTtoD();
                    break;
                case 'LD':
                    setTimerLD();
                    break;
                case 'LU':
                    setTimerLU();
                    break;
                case 'RD':
                    setTimerRD();
                    break;
                case 'RU':
                    setTimerRU();
                    break;
                default:
                    // statements_def
                    break;
            }

            function setTimerMidLDtoRU() {
                var nTimeout = Math.abs(sum - Math.min((nRows - 1), (nCols - 1)));
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            if (r == nRows - 1 && c == nCols - 1) {
                                reset();
                            }
                        }
                    });
                }, nTimeout * speed);
            }

            function setTimerMidLUtoRD() {
                var nTimeout = Math.abs(r - c);

                setTimeout(function() {
                    oSpan.stop().animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            var r = parseInt(oSpan.attr('data-r'));
                            var c = parseInt(oSpan.attr('data-c'));
                            console.log('minColRow' + minColRow);
                            console.log(nRows);
                            //如果不加这段 就会执行完之后 有一个小方块opacity变为1 好奇怪 而且如果执行完，还会多执行一句 
                            if (nRows == nCols) {
                                if ((c == nCols - 1 && r == 0) || (r == nRows - 1 && c == 0)) {
                                    reset();
                                    console.log('done');
                                }
                            } else {
                                if (minColRow == nRows) { //行数更少 左下方的小方块更快执行完，所以应该等右上方最后一个执行完才是整个动画结束的标志
                                    if (c == nCols - 1 && r == 0) { //这里判断要注意，下标是从0开始的
                                        reset();
                                        console.log('hey');
                                    }
                                } else { //minColRow == nCols 列数更短，即以左下方小方块结束为标志
                                    if (r == nRows - 1 && c == 0) {
                                        reset();
                                        console.log('world');

                                    }
                                }
                            }
                        }
                    });
                }, nTimeout * speed);
            }

            function setTimerLtoR() {
                var nRows = 1;
                var c = parseInt(oSpan.attr('data-c'));
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            if (c == nCols - 1) {
                                reset();
                            }
                        }
                    });
                }, c * speed);
            }

            function setTimerRtoL() {
                var nRows = 1;
                var c = parseInt(oSpan.attr('data-c'));
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            if (c == 0) {
                                reset();
                            }
                        }
                    });
                }, (nCols - 1 - c) * speed);
            }

            function setTimerTtoD() {
                var nCols = 1;
                var r = parseInt(oSpan.attr('data-r'));
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            if (r == nRows - 1) {
                                reset();
                            }
                        }
                    });
                }, r * speed);
            }

            function setTimerDtoT() {
                var nCols = 1;
                var r = parseInt(oSpan.attr('data-r'));
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            if (r == 0) {
                                reset();
                            }
                        }
                    });
                }, (nRows - 1 - r) * speed);
            }

            function setTimerLD() {
                var nTimeout = r - c;
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            if (r == 0 && c == nCols - 1) { //这里判断要注意，下标是从0开始的
                                $('img').attr('src', aPigPath[nCurPic % aPigPath.length]);
                                aSpan.css({
                                    'background-image': 'url(' + aPigPath[(nCurPic + 1) % aPigPath.length] + ')',
                                    opacity: 0
                                });
                                bIsAnimating = false;
                            }

                        }
                    });
                }, (nRows - nTimeout) * speed);
            }

            function setTimerLU() {
                var sum = parseInt(oSpan.attr('data-c')) + parseInt(oSpan.attr('data-r'));
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            var r = parseInt(oSpan.attr('data-r'));
                            var c = parseInt(oSpan.attr('data-c'));
                            if (r == nRows - 1 && c == nCols - 1) { //这里判断要注意，下标是从0开始的
                                $('img').attr('src', aPigPath[nCurPic % aPigPath.length]);
                                aSpan.css({
                                    'background-image': 'url(' + aPigPath[(nCurPic + 1) % aPigPath.length] + ')',
                                    opacity: 0
                                });
                                bIsAnimating = false;
                            }

                        }
                    });
                }, sum * speed);
            }

            function setTimerRD() {
                var total = nRows + nCols;
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            var r = parseInt(oSpan.attr('data-r'));
                            var c = parseInt(oSpan.attr('data-c'));
                            if (r == 0 && c == 0) { //这里判断要注意，下标是从0开始的
                                $('img').attr('src', aPigPath[nCurPic % aPigPath.length]);
                                aSpan.css({
                                    'background-image': 'url(' + aPigPath[(nCurPic + 1) % aPigPath.length] + ')',
                                    opacity: 0
                                });
                                bIsAnimating = false;
                            }

                        }
                    });
                }, (total - sum) * speed);
            }

            function setTimerRU() {
                var nTimeout = c - r;
                setTimeout(function() {
                    oSpan.animate({
                        opacity: 1
                    }, {
                        complete: function() {
                            var r = parseInt(oSpan.attr('data-r'));
                            var c = parseInt(oSpan.attr('data-c'));
                            if (r == nRows - 1 && c == 0) { //这里判断要注意，下标是从0开始的
                                $('img').attr('src', aPigPath[nCurPic % aPigPath.length]);
                                aSpan.css({
                                    'background-image': 'url(' + aPigPath[(nCurPic + 1) % aPigPath.length] + ')',
                                    opacity: 0
                                });
                                bIsAnimating = false;
                            }
                        }
                    });
                }, (nCols - nTimeout) * speed);
            }
        });

        function reset() {
            obj.attr('src', aPigPath[nCurPic % aPigPath.length]);
            aSpan.css({
                opacity: 0,
                'background-image': 'url(' + aPigPath[(nCurPic + 1) % aPigPath.length] + ')'
            });
            bIsAnimating = false;
        }
    });
};

$.fn.extend({
    extend1: function() {
        alert('extend1');
    },
    extend2: function() {
        alert('extend2');
    }
})
