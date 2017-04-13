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
            paperType_change:function (selectedType) {
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
                $scope.paperInfo.paperType=selectedType;
            },
            year_change:function (selectedYear) {
                $scope.paperInfo.year=selectedYear;
            },
            subject_change:function (selectedSubject) {
                $scope.paperInfo.subject=selectedSubject;
            },
            grade_change:function (selectedGrade) {
                $scope.paperInfo.grade=selectedGrade;
            },
            province_change:function (selectedProvince) {
                if (selectedProvince.id){
                    $scope.paperInfo.region=selectedProvince.province;
                    this.getCities(selectedProvince);
                }else {
                    $scope.ProvinceIsSelected=false;
                }
            },
            city_change:function (selectedCity) {
                $scope.paperInfo.region+=selectedCity.city;
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
                if ($scope.isSEE){
                    $scope.paperInfo.paperName=$scope.paperInfo.year+$scope.paperInfo.region+$scope.paperInfo.school+$scope.paperInfo.subject.value+$scope.paperInfo.paperType.value;
                }else {
                    $scope.paperInfo.paperName=$scope.paperInfo.year+$scope.paperInfo.region+$scope.paperInfo.school+$scope.paperInfo.grade.value+$scope.paperInfo.subject.value+$scope.paperInfo.paperType.value;
                }
                console.log($scope.paperInfo);
            },
            /*文件提交后*/
            onFileSubmit:function () {
                $timeout(function(){
                    $http.get(BASIC_DATA.API_URL+'/getFileUpload').then(function (data) {
                        console.log(data.data);
                    })
                },3000)
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

