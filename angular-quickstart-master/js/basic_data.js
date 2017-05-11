/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    var BASIC_DATA = {
        cnNum: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        TOP_ROUTER: 'index.html#!/',
        routerConfig: {
            /*任务列表页*/
            taskUpload: {
                state: "taskUpload",
                moduleName: '任务中心',
                url: '/taskUpload',
                templateUrl: "view/task_upload.html",
                controller: 'taskUploadController',
                role: 1,
                childrenPage: {
                    /*资源上传页*/
                    resourceUpload: {
                        state: "resourceUpload",
                        url: '/resourceUpload',
                        templateUrl: "view/resource_upload.html",
                        role: 1,
                        controller: 'resourceUploadController'
                    }
                }

            },
            /*内容制作页*/
            contentProduce: {
                state: 'contentProduce',
                moduleName: '内容制作',
                url: '/contentProduce',
                templateUrl: "view/content_produce.html",
                controller: 'contentProduceController',
                role: 1,
                childrenPage: {
                    answerProduce: {
                        state: "answerProduce",
                        url: '/answerProduce',
                        templateUrl: "view/answer_produce.html",
                        role: 1,
                        controller: 'answerProduceController'
                    }
                }
            },
            /*整卷预览页*/
            paperPreview: {
                state: "paperPreview",
                moduleName: '整卷预览',
                url: '/paperPreview',
                templateUrl: "view/paper_preview.html",
                role: 1,
                controller: 'paperPreviewController'
            },
            /*审核列表页*/
            auditList:{
                state: 'auditList',
                moduleName: '审核列表',
                url: '/auditList',
                templateUrl: "view/audit_list.html",
                role: 2,
                controller: 'auditListController'
            },
            /*内容审核页*/
            contentAudit: {
                state: 'contentAudit',
                moduleName: '内容审核',
                url: '/contentAudit',
                templateUrl: "view/content_audit.html",
                role: 2,
                controller: 'contentAuditController'
            }
        },

        API_URL: ' http://localhost:8080/question',
        PAPER_TYPE: [
            {
                code: '',
                value: '请选择'
            },
            {
                code: '11',
                value: '中考真题'
            },
            {
                code: '12',
                value: '期中考试'
            },
            {
                code: '13',
                value: '期末考试'
            },
            {
                code: '14',
                value: '月考'
            },
            {
                code: '15',
                value: '单元测试'
            }
        ],
        YEAR: ['请选择', 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000],
        SUBJECT: [
            {
                code: '',
                value: '请选择'
            },
            {
                code: '21',
                value: '语文'
            },
            {
                code: '22',
                value: '数学'
            },
            {
                code: '23',
                value: '英语'
            }
        ],
        GRADE: [
            {
                code: '',
                value: '请选择'
            },
            {
                code: '31',
                value: '一年级'
            },
            {
                code: '32',
                value: '二年级'
            },
            {
                code: '33',
                value: '三年级'
            },
            {
                code: '34',
                value: '四年级'
            },
            {
                code: '35',
                value: '五年级'
            },
            {
                code: '36',
                value: '六年级'
            },
            {
                code: '37',
                value: '初一'
            },
            {
                code: '38',
                value: '初二'
            },
            {
                code: '39',
                value: '初三'
            }
        ],
        TASK_STATUS:{
            '10':'正在制作',
            '20':'审核中',
            '30':'错误退回',
            '100':'已入库'
        }
    };
    window.BASIC_DATA = BASIC_DATA;
})();