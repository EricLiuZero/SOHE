var url;
function member_newUser(){
    $('#dlg-member').dialog('open').dialog('setTitle','新增');
    $('#fm-member').form('clear');
    url = 'api_member.ashx?action=add';
}
function member_editUser(){
    var row = $('#dg-member').datagrid('getSelected');
    if (row){
        $('#dlg-member').dialog('open').dialog('setTitle','編輯');
        $('#fm-member').form('load',row);
        url = '../api_member.ashx?action=save&id='+row.Id;
    }
}
function member_saveUser(){
    $('#fm-member').form('submit',{
        url: url,
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            var result = eval('('+result+')');
            if (result.errorMsg){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg-member').dialog('close');        // close the dialog
                $('#dg-member').datagrid('reload');    // reload the user data
            }
        }
    });
}
function member_destroyUser(){
    var row = $('#dg-member').datagrid('getSelected');
    if (row){
        $.messager.confirm('確認刪除','確定刪除此筆資料?',function(r){
            if (r){
                $.post('api_member.ashx?action=delete',{id:row.Id},function(result){
                    if (result.success){
                        $('#dg-member').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                },'json');
            }
        });
    }
}
		
function pagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}
		
function doSearch() {
    $('#dg-member').datagrid('load', {
        No: $('#itemid').val(),
        //productid: $('#productid').val()
    });
}