/**
 * Created by Administrator on 2017/4/2.
 */
(function () {
    angular.module('myApp').controller('resourceUploadController',['$scope','$http','$location','$timeout',function ($scope,$http,$location,$timeout) {
        declare($scope,$http,$timeout);
        declareModel($scope);
        init($scope,$http);
    }]);
    function declare($scope,$http,$timeout) {
        $scope.viewController={
            paperType_change:function (selectedType){
                if (selectedType.code==11){
                    $scope.isSEE=true;
                    $scope.showGradeSelect=false;
                    $scope.showSchoolInput=false;
                    $scope.paperInfo.grade='';
                    $scope.paperInfo.school='';
                }else {
                    $scope.isSEE=false;
                    $scope.showGradeSelect=true;
                    $scope.showSchoolInput=true;
                }
                selectedType.code!=''?$scope.paperInfo.paperType=selectedType.value:$scope.paperInfo.paperType='';
            },
            year_change:function (selectedYear) {
                $scope.paperInfo.year=selectedYear;
            },
            subject_change:function (selectedSubject) {
                selectedSubject.code!=''? $scope.paperInfo.subject=selectedSubject.value:$scope.paperInfo.subject='';

            },
            grade_change:function (selectedGrade) {
                selectedGrade.code!=''? $scope.paperInfo.grade=selectedGrade.value:$scope.paperInfo.grade='';

            },
            province_change:function (selectedProvince) {
                if (selectedProvince.id){
                    $scope.paperInfo.region=selectedProvince.province;
                    this.getCities(selectedProvince);
                }else {
                    $scope.ProvinceIsSelected=false;
                }
                $scope.cityPickingFinished=false;
            },
            city_change:function (selectedCity) {
                if (selectedCity.id!=''){
                    $scope.paperInfo.region+=selectedCity.city;
                    $scope.cityPickingFinished=true;
                }else {
                    $scope.cityPickingFinished=false;
                }

            },
            /*获取城市*/
            getCities:function (selectedProvince) {
                $http.get(BASIC_DATA.API_URL+'/cities/'+selectedProvince.provinceId).then(function (data) {
                    data.data.unshift({
                        id:'',
                        cityId:'',
                        city:'请选择市'
                    });
                    $scope.city=data.data;
                    $scope.selectedCity=$scope.city[0];
                    $scope.ProvinceIsSelected=true;
                })
            },
            /*提交试卷基础信息*/
            sumitPaperBasicInfo:function () {
                if (!$scope.isSEE){
                    $scope.paperInfo.paperName=$scope.paperInfo.year+$scope.paperInfo.region+$scope.paperInfo.school+$scope.paperInfo.subject+$scope.paperInfo.paperType;
                    console.log($scope.paperInfo);
                    /*前端验证所有信息的填写*/
                    if ($scope.paperInfo.year&&$scope.paperInfo.school&&$scope.paperInfo.grade&&$scope.paperInfo.subject&&$scope.paperInfo.paperType&&  $scope.cityPickingFinished){
                        $http({
                            method:'post',
                            url:BASIC_DATA.API_URL+'/task/startMaking',
                            data:$scope.paperInfo
                        }).then(function(data){
                            console.log(data);
                        });
                    }else{
                        swal({
                            title: "出错了",
                            text: "以上所有信息必填",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            closeOnConfirm: false,
                            html: false
                        });
                    }
                }else {
                    $scope.paperInfo.grade='';
                    $scope.paperInfo.school='';
                    $scope.paperInfo.paperName=$scope.paperInfo.year+$scope.paperInfo.region+$scope.paperInfo.school+$scope.paperInfo.grade+$scope.paperInfo.subject+$scope.paperInfo.paperType;
                    if ($scope.paperInfo.year&&$scope.paperInfo.subject&&$scope.paperInfo.paperType&&$scope.cityPickingFinished){
                        $http({
                            method:'post',
                            url:BASIC_DATA.API_URL+'/task/startMaking',
                            data:$scope.paperInfo
                        }).then(function(data){
                            console.log(data);
                        });
                    }else {
                        swal({
                            title: "出错了",
                            text: "以上所有信息必填",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            closeOnConfirm: false,
                            html: false
                        });
                    }
                }
            },
            /*文件提交后*/
            onFileSubmit:function () {
                $timeout(function(){
                    $http.get(BASIC_DATA.API_URL+'/getFileUpload').then(function (data) {
                        console.log(data);
                    })
                },3000)
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
                    if(getUlMLval<=(imgLength-4)*(-180)){
                        return false
                    }
                    ulNode.style.marginLeft=getUlMLval-180+'px';
                }else {
                    if(getUlMLval>=0){
                        return false
                    }
                    ulNode.style.marginLeft=getUlMLval+180+'px';
                }
                $scope.flag=false;
            }
        }
    }
    function init($scope,$http) {
        //配置jQuery文件上传插件
        $('input[name="files"]').fileuploader({
            extensions:['jpg','jpeg','docx','pdf','png'],
            removeConfirmation: false
        });
        /*配置查看图片大图插件*/
        $('.images').viewer({
            navbar:false,
            rotatable:false
        });
        /*获取省份*/
        $http.get(BASIC_DATA.API_URL+'/provinces').then(function (data) {
            console.log(data);
            data.data.unshift({
                id:'',
                provinceId:'',
                province:'请选择省份'
            });
            $scope.province=data.data;
            $scope.selectedProvince=$scope.province[0];
        });
    }
    function declareModel($scope) {
        $scope.flag=true;//设置点击事件响应的时间间隔
        $scope.paperType=BASIC_DATA.PAPER_TYPE;
        $scope.year=BASIC_DATA.YEAR;
        $scope.subject=BASIC_DATA.SUBJECT;
        $scope.grade=BASIC_DATA.GRADE;
        $scope.paperInfo={
            paperType:'',
            year:'',
            region:'',
            subject:'',
            grade:'',
            school:'',
            paperName:''
        };
        /*控制select显示隐藏的model*/
        $scope.showGradeSelect=true;
        $scope.showSchoolInput=true;
        $scope.ProvinceIsSelected=false;
    }
})();

