/**
 * Created by Administrator on 2017/4/4.
 */
/**
 * Created by Administrator on 2017/4/2.
 */
(function () {
    angular.module('myApp').controller('contentProduceController', ['$scope', '$http', '$location', '$sce', '$state', '$stateParams', '$rootScope', '$timeout', function ($scope, $http, $location, $sce, $state, $stateParams, $rootScope, $timeout) {
        declareModel($scope);
        declare($scope, $sce, $state, $location, $timeout);
        init($scope, $http, $sce, $rootScope, $timeout);
    }]);
    function declareModel($scope) {
        $scope.btnOnSave = [];
        $scope.hideExplain = [];
        /*控制操作区active类名的model*/
        $scope.currentQuestion = [];
        $scope.BASIC_DATA = window.BASIC_DATA;
    }

    function declare($scope, $sce, $state, $location, $timeout) {
        $scope.viewController = {
            newUeditor: function ($event, $index, question) {
                var showContentNode, questionItemNode, examPointNode;
                //判断是否点击的同一个
                if ($scope.pre == $index) {
                    return false
                }
                $scope.hideExplain[$scope.pre]=false;
                $scope.currentQuestion[$scope.pre] = false;
                $scope.currentQuestion[$index] = true;
                $scope.pre = $index;
                $event.stopPropagation();
                if ($scope.isEditing) {
                    this.destroyUeditor();
                }
                $scope.isEditing = true;
                showContentNode = document.getElementsByClassName('showContent');
                questionItemNode = document.getElementsByClassName('question-item');
                angular.forEach($scope.hideExplain, function (i) {
                    i = false;
                });
                $scope.hideExplain[$index] = true;
                for (var i = 0; i < showContentNode.length; i++) {
                    showContentNode[i].style = "display:block;";
                    questionItemNode[i].style = "border:1px solid #dcdcdc;";
                }
                showContentNode[$index].style = "display:none";
                questionItemNode[$index].style = "border:1px solid #92b65c;";
                $scope.ue = UE.getEditor('Ueditor' + $index, {
                    elementPathEnabled: false,
                    lang: 'zh-cn',
                    wordCount: false,         //是否开启字数统计
                    fontFamily: [{label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'}]
                });
                $scope.ue.ready(function () {
                    $scope.ue.setContent(showContentNode[$index].innerHTML);
                    /*内容发生改变，保存按钮处于未激活状态*/
                    $scope.ue.addListener('contentChange', function () {
                        $scope.btnOnSave[$index] = false;
                        $scope.$apply();
                    })
                })
            },
            /*销毁Ueditor*/
            destroyUeditor: function () {
                $scope.html = $sce.trustAsHtml($scope.ue.getContent());
                $scope.isEditing = false;
                $scope.ue.destroy();
            },
            /*保存*/
            saveQuestion: function ($event, $parent, $index, questionIndex, isJumpToNext) {
                if ($scope.ue) {
                    console.log($scope.ue.getContent());
                    $event.stopPropagation();
                    $scope.hideExplain[questionIndex] = false;
                    $scope.btnOnSave[questionIndex] = true;
                    /*保存按钮激活*/
                    $scope.svaeHtml = $scope.ue.getContent();
                    $scope.paper.questionHeadline[$parent.$index].questionList[$index].stem = $sce.trustAsHtml($scope.svaeHtml);

                    if (!isJumpToNext) {
                        this.destroyUeditor();
                        return false
                    }
                    var jumpToElementId = '#Ueditor' + (questionIndex + 1);
                    $scope.viewController.newUeditor($event, questionIndex + 1);
                    $('body').animate({
                        scrollTop: $(jumpToElementId).offset().top - 350
                    }, 1000);
                }
            },
            /*计算题序*/
            questionIndexCom: function ($parent, $index) {
                var tempLength = 0, i;
                /*返回题干录入做特殊处理*/
                if (typeof $parent == 'number') {
                    for (i = 0; i < $parent; i++) {
                        tempLength += $scope.paper.questionHeadline[i].questionList.length;
                    }
                } else {
                    for (i = 0; i < $parent.$index; i++) {
                        tempLength += $scope.paper.questionHeadline[i].questionList.length;
                    }
                }
                $scope.questionIndex = tempLength + $index;
                return $scope.questionIndex;
            },
            /*跳转至解析录入界面*/
            answerProduce: function ($event, $parent, $index) {
                var questionIndex, parentIndex, childIndex;
                questionIndex = this.questionIndexCom($parent, $index);
                this.saveQuestion($event, $parent, $index, questionIndex, false);
                swal({
                    title: "保存成功！",
                    text: "2秒后进入解析录入界面",
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    closeOnConfirm: false,
                    timer: '2000',
                    html: false
                });
                parentIndex = $parent.$index;
                childIndex = $index;
                /*$state.go('answerProduce',{
                 args:{
                 parentIndex:parentIndex,
                 childIndex:childIndex,
                 questionIndex:questionIndex
                 }
                 });*/
                $timeout(function () {
                    $state.go('answerProduce', {
                        parentIndex: parentIndex,
                        childIndex: childIndex,
                        questionIndex: questionIndex
                    });
                }, 2000)

            },
            /*操作区快速导航*/
            shortcutJump: function ($event, $parent, $index) {
                var questionIndex, jumpToElementId;
                questionIndex = this.questionIndexCom($parent, $index);
                /*控制操作区题号active属性*/
                for (var i = 0; i < $scope.currentQuestion.length; i++) {
                    $scope.currentQuestion[i] = false;
                }
                $scope.currentQuestion[questionIndex] = true;
                jumpToElementId = '#Ueditor' + questionIndex;
                $scope.viewController.newUeditor($event, questionIndex);
                $('body').animate({
                    scrollTop: $(jumpToElementId).offset().top - 600
                }, 1000);
            },
            /*操作区添加 小题*/
            addQuestion: function (parentIndex) {
                $scope.paper.questionHeadline[parentIndex].questionList.push({
                    stem: $sce.trustAsHtml('1111111111111111111111')
                });
            },
            /*操作区添加 大题*/
            addQuestionHeadline:function () {
                $scope.paper.questionHeadline.push({
                    questionType:'',
                    questionList:[
                        {
                            stem:''
                        }
                    ]
                });
            }/*,
            /!*初始化图片预览插件*!/
            initViewer:function () {
                $('.images').viewer('build');
            },
            /!*销毁图片预览插件*!/
            destroyViewer:function () {
                $('.images').viewer('hidden');
            }*/
        }
    }

    function init($scope, $http, $sce, $rootScope, $timeout) {
        $('.images').viewer({
            navbar: false,
            rotatable: false,
            zoomRatio:0.2
        });
        /*$scope.paper = {
            questionHeadline: [
                {
                    questionType: '填空题I',
                    questionList: [
                        {
                            stem: $sce.trustAsHtml('<p>4 月 5 日清明节是中国二十四节气之一．已知一年有 24 个节气，那么，平均每个月有__________</p><p>个节气．</p><p><br/></p>'),
                            examPoint: '',
                            answer: '',
                            solution: ''
                        },
                        {
                            stem: $sce.trustAsHtml('<p>甲、乙两人玩井字棋游戏，轮流在一个 3 3  的方格棋盘内画符号，甲画“ ”先走，乙画“  ”</p><p>后走．谁能将棋盘的一整行、一整列或一整条对角线的 3 个格都画上自己的符号，谁就赢．如果</p><p>前 4 步甲乙所下位置如下左图所示，那么，甲下一步应该下在__________号位置（位置编号如下</p><p>右图所示），才能保证必胜．</p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span></p><p>俗话说：卢沟桥的狮子，数不清．俊俊去卢沟桥数狮子，发现一共有 300 只狮子．其中大狮子与</p><p>小狮子的数量之比是 2:1 ，那么，小狮子有__________只</p><p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span><br/></p><p><br/></p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p>如图，已知圆的半径是 10 厘米，六条直径将圆十二等分．那么，阴影面积之和是__________平方</p><p>厘米．（ π 取 3.14）</p><p><br/></p>')
                        }
                    ]
                },
                {
                    questionType:'填空题II',
                    questionList:[
                        {
                            stem:$sce.trustAsHtml('<p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span></p><p>佳佳是一位国旗爱好者，他从全世界 193 个国家的国旗中，挑出了 43 面带星星图案或带月亮图案</p><p>的国旗，发现其中带星星图案的国旗有 34 面．带月亮图案的国旗有 18 面，那么，既带星星图案</p><p>又带月亮图案的国旗有__________面．</p><p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span><br/></p><p><br/></p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>东东喝一瓶浓度是 40%的饮料，喝到剩 60 克饮料时，觉得饮料太浓了，就加了一些水，将饮料的</p><p>浓度兑成了 30%．那么，东东加了__________克水．</p><p><br/></p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>2*4*6*8*10*12*14*16*18*20的计算结果末尾有__________个连续的 0．</p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>一个容积是 100 立方厘米的水杯（即这个水杯装满水时，水的体积是 100 立方厘米），内有一部分</p><p>水，盛盛向杯中放入了一个小正方体，水溢出了 20 立方厘米；盛盛又向杯中放入了一个相同的小</p><p>正方体，水又溢出了 30 立方厘米（如图）．那么，原来水杯中装有__________立方厘米的水．</p><p><br/></p>')
                        },
                    ]
                },
                {
                    questionType: '填空题III',
                    questionList: [
                        {
                            stem: $sce.trustAsHtml('<p>4 月 5 日清明节是中国二十四节气之一．已知一年有 24 个节气，那么，平均每个月有__________</p><p>个节气．</p><p><br/></p>'),
                            examPoint: '',
                            answer: '',
                            solution: ''
                        },
                        {
                            stem: $sce.trustAsHtml('<p>甲、乙两人玩井字棋游戏，轮流在一个 3 3  的方格棋盘内画符号，甲画“ ”先走，乙画“  ”</p><p>后走．谁能将棋盘的一整行、一整列或一整条对角线的 3 个格都画上自己的符号，谁就赢．如果</p><p>前 4 步甲乙所下位置如下左图所示，那么，甲下一步应该下在__________号位置（位置编号如下</p><p>右图所示），才能保证必胜．</p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span></p><p>俗话说：卢沟桥的狮子，数不清．俊俊去卢沟桥数狮子，发现一共有 300 只狮子．其中大狮子与</p><p>小狮子的数量之比是 2:1 ，那么，小狮子有__________只</p><p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span><br/></p><p><br/></p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p>如图，已知圆的半径是 10 厘米，六条直径将圆十二等分．那么，阴影面积之和是__________平方</p><p>厘米．（ π 取 3.14）</p><p><br/></p>')
                        }

                    ]
                },
                {
                    questionType:'填空题IV',
                    questionList:[
                        {
                            stem:$sce.trustAsHtml('<p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span></p><p>佳佳是一位国旗爱好者，他从全世界 193 个国家的国旗中，挑出了 43 面带星星图案或带月亮图案</p><p>的国旗，发现其中带星星图案的国旗有 34 面．带月亮图案的国旗有 18 面，那么，既带星星图案</p><p>又带月亮图案的国旗有__________面．</p><p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span><br/></p><p><br/></p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>东东喝一瓶浓度是 40%的饮料，喝到剩 60 克饮料时，觉得饮料太浓了，就加了一些水，将饮料的</p><p>浓度兑成了 30%．那么，东东加了__________克水．</p><p><br/></p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>2*4*6*8*10*12*14*16*18*20的计算结果末尾有__________个连续的 0．</p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>一个容积是 100 立方厘米的水杯（即这个水杯装满水时，水的体积是 100 立方厘米），内有一部分</p><p>水，盛盛向杯中放入了一个小正方体，水溢出了 20 立方厘米；盛盛又向杯中放入了一个相同的小</p><p>正方体，水又溢出了 30 立方厘米（如图）．那么，原来水杯中装有__________立方厘米的水．</p><p><br/></p>')
                        },
                    ]
                },
                {
                    questionType:'计算题',
                    questionList:[
                        {
                            stem:$sce.trustAsHtml('<p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span></p><p>计算下列题目，写出简要的计算过程与计算结果：</p><p>（1）<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA1CAYAAAAd84i6AAABaklEQ…mBku9wGM6RQBjOkXLJGmG4ZPo5aofhHCmXrBGGS6afo/Ynuuw5Nln1AToAAAAASUVORK5CYII=" data-latex="\frac {1} {4}"/>+<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA1CAYAAAAeRIaSAAAB2klEQ…MOM39cXzcEQjIhmbDsttghdogdYoehZox9lf2Z35Ng/IPsN7uoTzYxvz10AAAAAElFTkSuQmCC" data-latex="\frac {1} {12}"/>+<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAA1CAYAAAAasVavAAACHElEQ…3mf4MnjHxrrdZQKiOVkcqora9pk7RJ2iRtUksgbZI2qRXJb3jQXTYlPDjJAAAAAElFTkSuQmCC" data-latex="\frac {1} {24}"/>+<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAA1CAYAAAAasVavAAACCklEQ…qiG8dPGHlqHS6aVEYqI5VRW1DTJmmTtEnapJZA2iRtUiuSP7btYTZsfLs7AAAAAElFTkSuQmCC" data-latex="\frac {1} {40}"/></p><p>（2）2<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA1CAYAAAAd84i6AAACBUlEQ…04MwPNcGa2a8RqhmtkPTNmM5yZ7RqxmuEaWc+M2TvDvwHsokc2nui7VAAAAABJRU5ErkJggg==" data-latex="\frac {6} {7}"/>*5<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA1CAYAAAAd84i6AAACGklEQ…k34OwMNMPZGc+O1wxnZzw7XjOcnfHseM1wdsaz442c4e+iNE02nJzkkwAAAABJRU5ErkJggg==" data-latex="\frac {3} {5}"/>-<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA1CAYAAAAd84i6AAACBUlEQ…04MwPNcGa2a8RqhmtkPTNmM5yZ7RqxmuEaWc+M2TvDvwHsokc2nui7VAAAAABJRU5ErkJggg==" data-latex="\frac {6} {7}"/>÷<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAA1CAYAAAAasVavAAAC7ElEQ…WCBUaBMXpCFWcUZxRn1C42JU1KmpQ0KWlSS6CkyeiI7gL28nI2j0DSPAAAAABJRU5ErkJggg==" data-latex="\frac {5} {28}"/>+3*<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAA1CAYAAAAasVavAAACzElEQ…XRrwjUEr775ag2qcqoyugxVVWbVJtUm1Sb9Eig2qR7RP8DiYdyNpKTUWUAAAAASUVORK5CYII=" data-latex="\frac {28} {5}"/></p><p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span><br/></p><p><br/></p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>解下列方程或方程组，写出简要的解方程过程与方程的解：</p><p>（1）<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAA1CAYAAADS3bx5AAAChklEQ…SmJrJCJgkklamJrJBJAkllaiIrZJJAUpmayAqZJJBU5g8KOF42KaZm+wAAAABJRU5ErkJggg==" data-latex="\frac {x-1} {3}"/>+4=<img class="kfformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAA1CAYAAAA9H9dHAAADHklEQ…TgKBXODJiOBBylwpkB05GAo1Q4M2A6EnCUCmcGTEcCjlK/AS9lgTZCfXjMAAAAAElFTkSuQmCC" data-latex="\frac {x+5} {2}"/></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3x+4y=32</p><p>（2）<span style="font-size: 36px;">{</span></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 4x+3y=31<br/></p>')
                        }
                    ]
                },
                {
                    questionType:'解答题',
                    questionList:[
                        {
                            stem:$sce.trustAsHtml('<p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span></p><p>如图，正方形 ABCD 与两个直角三角形 ADE、BCF 拼成了等腰梯形 ABFE，已知 AB=12,ED=CF=4.</p><p>（1）请求出三角形 ADE 的面积．</p><p>（2）请求出三角形 ABE 的面积．</p><p>（3）请求出 : EG:GB ．</p><p>（4）请求出阴影部分的总面积．</p><p><span style="font-family:&#39;Times New Roman&#39;,&#39;serif&#39;"></span><br/></p><p><br/></p>')
                        },
                        {
                            stem:$sce.trustAsHtml('<p>将一个数进行如下反复四舍五入的操作，从最低位开始，直到某次操作后，只剩最高位，且其它</p><p>位数都是 0 为止，例如：</p><p>1546.47→1546.5→1547→1550→1600→2000，记为 T（1546.47）=2000 ；</p><p>T（6）=6．</p><p>利用这种操作解决下列问题：</p><p>（1）计算： T（234.5） __________，T（144.5） __________．（只填空即可）</p><p>（2）使得 T（x）=100的整数 x 有多少个？</p><p>（3）将一个数直接从第二高位进行一次四舍五入的操作记为 F 操作，</p><p>例如： F（1487）=1000 ； F（6）=6．请问：</p><p>T（1）+T（2）+T（3）+…T（999）+T（1000）&nbsp;和 F（1）+F（2）+F（3）+…F（999）+F（1000）</p><p>作比较，谁更大？大多少？</p><p><br/></p>')
                        }
                    ]
                }
            ]
        };*/
        $scope.paper={
            questionHeadline:[{
                questionType: '',
                questionList: [
                    {
                        stem: ''
                    }
                ]
            }
            ]
        };
        if (typeof $rootScope.previousState_params.questionIndex != 'undefined') {
            var questionIndex;
            questionIndex = $scope.viewController.questionIndexCom(parseInt($rootScope.previousState_params.parentIndex), parseInt($rootScope.previousState_params.childIndex));
            $timeout(function () {
                $scope.currentQuestion[questionIndex] = true;
                $('body').animate({
                    scrollTop: $('.showContent').eq(questionIndex).offset().top - 340
                }, 0);
            }, 50);

        }
    }
})();


