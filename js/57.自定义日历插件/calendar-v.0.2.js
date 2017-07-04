(function() {
    var added = false;

    window.calendar = function(oT) {
        var oCalendar = null;
        oT.onfocus = function() {
            var aCalendar = document.getElementsByClassName('calendar');
            for (var i = 0; i < aCalendar.length; i++) {
                aCalendar[i].parentNode.removeChild(aCalendar[i]);
            }
            // 创建DOM
            oCalendar = document.createElement('div');
            oCalendar.className = 'calendar';
            oCalendar.innerHTML = `
				<a href="javascript:;" class="prev">←</a>
				<a href="javascript:;" class="next">→</a>
				<h2></h2>
				<ol>
					<li>一</li>
					<li>二</li>
					<li>三</li>
					<li>四</li>
					<li>五</li>
					<li class="weekend">六</li>
					<li class="weekend">日</li>
				</ol>
				<ul></ul>
			`;
            oT.parentNode.appendChild(oCalendar);
            oCalendar.style.left = oT.offsetLeft + 'px';
            oCalendar.style.top = oT.offsetTop + oT.offsetHeight + 5 + 'px';
            _calendar();
            // 消失
            document.onclick = function() {
                oCalendar.parentNode.removeChild(oCalendar);
            };
        };

        // 引入CSS文件
        if (!added) {
            var oLink = document.createElement('link');
            oLink.rel = 'stylesheet';
            oLink.href = 'calendar-v.0.1.css';
            document.getElementsByTagName('head')[0].appendChild(oLink);
            added = true;
        }


        oT.onclick = function(ev) {
            var oEvent = ev || event;
            oEvent.cancelBubble = true;
        };

        function _calendar() {
            // 当前月
            var now = 0;
            _create();

            // 下一个月
            var oNext = oCalendar.getElementsByClassName('next')[0];
            oNext.onclick = function() {
                now++;
                _create();
            };

            // 上一个月
            var oPrev = oCalendar.getElementsByClassName('prev')[0];
            oPrev.onclick = function() {
                now--;
                _create();
            };

            function _create() {
                // 修改标题时间
                var oH2 = oCalendar.getElementsByTagName('h2')[0];
                var oDate = new Date();
                oDate.setMonth(oDate.getMonth() + now);
                var year = oDate.getFullYear();
                var month = oDate.getMonth();
                oH2.innerHTML = year + '年' + toDub(month + 1) + '月';

                var oUl = oCalendar.getElementsByTagName('ul')[0];
                oUl.innerHTML = '';
                // 创建空格
                var oDate = new Date();
                oDate.setMonth(oDate.getMonth() + now);
                oDate.setDate(1);
                var nSpace = oDate.getDay();
                // (nSpace==0) && (nSpace=7);
                if (nSpace == 0) {
                    nSpace = 7;
                }

                for (var i = 0; i < nSpace - 1; i++) {
                    var oLi = document.createElement('li');
                    oUl.appendChild(oLi);
                }

                // 创建日期
                var oDate = new Date();
                oDate.setMonth(oDate.getMonth() + now);
                oDate.setMonth(oDate.getMonth() + 1, 0);
                var nTotal = oDate.getDate();
                for (var i = 0; i < nTotal; i++) {
                    var oLi = document.createElement('li');
                    oLi.innerHTML = i + 1;
                    oUl.appendChild(oLi);
                }

                // 周末变红 
                var aLi = oUl.children;
                for (var i = 0; i < aLi.length; i++) {
                    if (i % 7 == 5 || i % 7 == 6) {
                        aLi[i].classList.add('weekend');
                    }
                }

                if (now == 0) {
                    // 今天变
                    var oDate = new Date();
                    var nToday = oDate.getDate();
                    for (var i = 0; i < aLi.length; i++) {
                        if (aLi[i].innerHTML == nToday) {
                            aLi[i].classList.add('today');
                        } else if (aLi[i].innerHTML < nToday) {
                            aLi[i].classList.add('past');
                        }
                    }
                } else if (now < 0) {
                    for (var i = 0; i < aLi.length; i++) {
                        aLi[i].classList.add('past');
                    }
                }
            }
        }

        function toDub(n) {
            return n < 10 ? '0' + n : '' + n;
        }
    };
})();
