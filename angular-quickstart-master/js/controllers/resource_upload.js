/**
 * Created by Administrator on 2017/4/2.
 */
(function () {
    angular.module('myApp').controller('resourceUploadController',['$scope','$http','$location',function ($scope,$http,$location) {
        declare($scope);
        init($scope,$http);
    }]);
    function declare($scope) {
        $scope.viewController={
            paperType_change:function (selectedType) {
                $scope.paperInfo.paperType=selectedType;
                console.log($scope.paperInfo);
            },
            year_change:function (selectedYear) {
                $scope.paperInfo.year=selectedYear;
                console.log($scope.paperInfo)
            },
            subject_change:function (selectedSubject) {
                $scope.paperInfo.subject=selectedSubject;
                console.log($scope.paperInfo);
            },
            grade_change:function (selectedGrade) {
                $scope.paperInfo.grade=selectedGrade;
                console.log($scope.paperInfo);
            }
        }
    }
    function init($scope,$http) {
        //配置jQuery文件上传插件
        $('#filer_input').filer({
            showThumbs:true,
            addMore:true
        });
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
        }
    }
})();

