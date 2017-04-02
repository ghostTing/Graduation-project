/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    var BASIC_DATA={
        TOP_ROUTER:'index.html#!/',
        routerConfig:{
            /*任务列表页*/
            taskUpload:{
                state:"taskUpload",
                moduleName:'任务上传',
                url: '/taskUpload',
                templateUrl:"view/task_upload.html",
                controller: 'taskUploadController',
                childrenPage:{
                    /*资源上传页*/
                    resourceUpload:{
                        state:"resourceUpload",
                        url: '/resourceUpload',
                        templateUrl:"view/resource_upload.html",
                        controller: 'resourceUploadController'
                        }
                    }

            },
            contentProduce:{
                state:"contentProduce",
                moduleName:'内容制作',
                url: '/contentProduce',
                templateUrl:"view/content_produce.html",
                controller: 'contentProduceController'
            }
        },
        API_URL:' http://localhost:3000'
    };
    window.BASIC_DATA=BASIC_DATA;
})();