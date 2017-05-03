/**
 * Created by Administrator on 2017/4/29.
 */
(function(){
    angular.module('myApp').controller('contentAuditController',['$scope','$http','$sce',function($scope,$http,$sce){
        declareModel($scope);
        declare($scope, $sce);
        init($scope, $http, $sce);
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
    function init($scope, $http, $sce){
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