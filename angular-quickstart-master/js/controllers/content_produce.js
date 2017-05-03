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
        $scope.flag=true;
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
                var biggestParentIndex,biggestChildIndex,LastQuestionIndex,jumpToElementId;
                biggestParentIndex=$scope.paper.questionHeadline.length-1;
                biggestChildIndex=$scope.paper.questionHeadline[biggestParentIndex].questionList.length-1;
                LastQuestionIndex=this.questionIndexCom(biggestParentIndex,biggestChildIndex);

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
                    if(questionIndex!=LastQuestionIndex){
                        jumpToElementId = '#Ueditor' + (questionIndex + 1);
                        $scope.viewController.newUeditor($event, questionIndex + 1);
                        $('body').animate({
                            scrollTop: $(jumpToElementId).offset().top - 350
                        }, 1000);
                    }else {
                        /*$scope.hideExplain[questionIndex] = true;
                        jumpToElementId = '#Ueditor0' ;
                        $scope.viewController.newUeditor($event, 0);
                        $('body').animate({
                            scrollTop: $(jumpToElementId).offset().top - 550
                        }, 1000);*/
                        this.destroyUeditor();
                        document.getElementsByClassName('showContent')[questionIndex].style.display='block';
                    }
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
            },
            /*移动图片*/
            moveTo:function (derection) {
                var ulNode,getUlMLval,imgLength;
                /*设置点击事件响应的时间间隔*/
                if (!$scope.flag){
                    return false;
                }
                setTimeout(function(){
                    $scope.flag=true;
                },500);
                ulNode=document.getElementsByClassName('images')[0];
                if (ulNode.currentStyle){
                    getUlMLval=ulNode.currentStyle('marginLeft');
                }else {
                    getUlMLval=parseInt(getComputedStyle(ulNode).marginLeft);
                }
                imgLength=ulNode.getElementsByTagName('li').length;
                if (derection=='l'){
                    if(getUlMLval<=(imgLength-4)*(-160)){
                        return false
                    }
                    ulNode.style.marginLeft=getUlMLval-160+'px';
                }else {
                    if(getUlMLval>=0){
                        return false
                    }
                    ulNode.style.marginLeft=getUlMLval+160+'px';
                }
                $scope.flag=false;
            }
        }
    }

    function init($scope, $http, $sce, $rootScope, $timeout) {
        $rootScope.currentPage('contentProduce');
        $('.images').viewer({
            navbar: false,
            rotatable: false,
            zoomRatio:0.2
        });
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


