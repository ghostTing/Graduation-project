/**
 * Created by Administrator on 2017/4/29.
 */
(function(){
    angular.module('myApp').controller('contentAuditController',['$scope','$http','$sce','$rootScope',function($scope,$http,$sce,$rootScope){
        declareModel($scope);
        declare($scope, $sce);
        init($scope, $http, $sce,$rootScope);
    }]);
    function declareModel($scope) {
        $scope.flag=true;
       $scope.BASIC_DATA=window.BASIC_DATA;
    }
    function declare($scope,$sce) {
        $scope.viewController={
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
            submitErrMsg:function () {
                swal({
                        title: "批注提交",
                        text: "提交前确保所有题目的错误批注填写完毕",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    },
                    function(){
                        setTimeout(function(){
                            swal("提交成功");
                        }, 2000);
                    });
               /* swal({
                        title: "确认提交?",
                        text: "请确保所有题目的错误批注填写完毕",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            setTimeout(function(){
                                swal("Ajax request finished!");
                            }, 2000);
                        } else {
                            swal("取消成功", "您填写的批注仍旧保存", "error");
                        }
                    });*/
            },
            passAudit:function () {
                swal({
                        title: "审核通过",
                        text: "确保所有题目的正确无误？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    },
                    function(){
                        setTimeout(function(){
                            swal("提交成功");
                        }, 2000);
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
    function init($scope, $http, $sce,$rootScope){
        $rootScope.currentPage('contentAudit');
        $('.images').viewer({
            navbar: false,
            rotatable: false,
            zoomRatio:0.2
        });
        $scope.paper={
            questionHeadline:[{
                questionType: '选择题',
                questionList: [
                    {
                        stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                    },
                    {
                        stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                    },
                    {
                        stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                    },
                    {
                        stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                    }
                ]
            },
                {
                    questionType: '选择题',
                    questionList: [
                        {
                            stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                        },
                        {
                            stem: $sce.trustAsHtml('<p>&nbsp;2014 年 2 月共有 28 天，据气象部门统计，这个月北京有雾霾的天数占全月总天数的3/7,盛盛喜欢</p><p>跑步，他在雾霾天每天跑 1 圈，其它时间每天跑 3 圈．那么，盛盛 2014 年 2 月总共跑了______圈</p><p><br/></p>')
                        }
                    ]
                }
            ]
        };
    }
})();