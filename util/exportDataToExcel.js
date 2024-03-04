// 建立一个工具类函数文件 utils.js
export function tableToExcel(jsonData, str) {
    //要导出的json数据
    let worksheet = 'sheet1'
    // let str = '<tr><td>姓名</td><td>电话</td><td>邮箱</td></tr>'
    //循环遍历，每行加入tr标签，每个单元格加td标签
    // console.log('jsonData: ', jsonData);
    for (let i = 0; i < jsonData.length; i++) {
        str += '<tr>'
        for (let key in jsonData[i]) {
            // console.log('key: ', key);
            // console.log('jsonData[i][key]: ', jsonData[i][key]);
            //增加\t为了不让表格显示科学计数法或者其他格式
            str += `<td>${jsonData[i][key] + '\t'}</td>`
        }
        str += '</tr>'
        // console.log('str: ', str);
    }
    //下载的表格模板数据
    let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml encoding="UTF-8"><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
      </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body><table>${str}</table></body></html>`
    //下载模板
    return template
}


// 同上放在 utils.js
export function exportExcel(fileData, documentName = 'excel') {
    /*
    PRIVATE_DOC: 应用私有文档目录常量
    PUBLIC_DOCUMENTS: 程序公用文档目录常量
    */
   
    plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function (fs) {
        let rootObj = fs.root
        let fullPath = rootObj.fullPath
        console.log("开始导出数据********")
        // 创建文件夹
        rootObj.getDirectory(documentName, {
            create: true
        }, function (dirEntry) {
            // 创建文件,防止重名
            let fileName = new Date().getTime()
            console.log(fileName)
            dirEntry.getFile(`${fileName}.xlsx`, {
                create: true
            }, function (fileEntry) {
                fileEntry.createWriter(function (writer) {
                    writer.onwritestart = (e) => {
                        showLoading('正在导出')
                    }
                    writer.onwrite = (e) => {
                        // 成功导出数据
                        hideLoading()
                        setTimeout(() => {
                            showToast('导出成功')
                            const path = `file://${fullPath}${documentName}/${fileName}.xlsx`
                            console.log('文件位置：', path)
                            // 打开文件
                            uni.openDocument({
                                filePath: path,
                                success: res => {
                                    console.log('打开文档成功', res)
                                },
                                fail: e => {
                                    console.log('打开失败', e)
                                }
                            })
                        }, 500)
                    }
                    // 写入内容
                    writer.write(fileData)
                }, function (e) {
                    console.log(e.message)
                })
            })
        })
    })
}

function showToast(title = '') {
    uni.hideLoading()
    uni.showToast({
        title,
        icon: 'none',
        duration: 1500
    })
}
/**
 * loading
 * @param title
 */
function showLoading(title = '加载中') {
    uni.hideLoading()
    uni.showLoading({
        title,
        mask: true
    })
}
/**
 * hideLoading
 */
function hideLoading() {
    uni.hideLoading()
}
