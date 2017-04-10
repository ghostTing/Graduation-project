/*
setTimeout(function () {
    window.location='/index.html'
},2000)*/
(function () {
    var loginApp=angular.module('loginApp',['oitozero.ngSweetAlert']);
    angular.module('loginApp').controller('loginController',['$scope','SweetAlert','$http',function ($scope,SweetAlert,$http) {
        declareModel($scope);
        declare($scope,SweetAlert,$http);
        init($scope);
    }]);
    /*声明和页面交互的model*/
    function declareModel($scope) {
        $scope.enterSelected=false;
        $scope.auditSelected=false;
        $scope.confirmPassword='';
        $scope.resUserName='';
        $scope.regPassword='';
    }
    function declare($scope,SweetAlert,$http) {
        $scope.viewController={
            /*完成注册*/
            finishReg:function () {
                if(($scope.enterSelected||$scope.auditSelected)&&$scope.resUserName.length>=3&&$scope.regPassword.length>=3&&$scope.confirmPassword.length>=3){
                    if ($scope.regPassword!==$scope.confirmPassword){
                        SweetAlert.swal("两次密码输入不一致", "温馨提示：密码区分大小写！");
                    }else{
                        $scope.viewController.regRequest();
                    }
                }else if(!$scope.resUserName||$scope.resUserName.length<3){
                    SweetAlert.swal("请输入3位以上的用户名");
                }else if(!$scope.regPassword||$scope.regPassword.length<3){
                    SweetAlert.swal("请输入3位以上的密码");
                }else if(!$scope.confirmPassword){
                    SweetAlert.swal("请确认密码");
                }else if(!($scope.enterSelected||$scope.auditSelected)){
                    SweetAlert.swal("请选择一个角色");
                }
            },
            regRequest:function () {
                $http({
                    method:'post',
                    data:{
                        username:$scope.resUserName,
                        password:$scope.regPassword,
                        role:$scope.roleCode
                    },
                    url:'http://localhost:8080/question/register'
                }).then(function () {
                    swal("Good job!", "注册成功！！", "success");
                },function () {
                    swal("用户名已存在");
                })
            },
            login:function () {
                $http({
                    method:'post',
                    data:{
                        username:$scope.username,
                        password:$scope.password
                    },
                    url:'http://localhost:8080/question/login'
                }).then(function () {

                })
            }
        }
    }
    function init($scope) {
        $scope.whenLogin=true;
        $scope.showLoginform=true;
    }
})();

