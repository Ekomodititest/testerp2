// JavaScript Document

function simpan(fileTarget,passParam) {
    param='';
    var passP = passParam.split('##');
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    loadData();
                    cancelIsi();
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    post_response_text(fileTarget+'.php', param, respon);
}

function loadData()
{
    param='method=loadData';
    tujuan='kebun_slave_periksabuah';
    post_response_text(tujuan+'.php', param, respon);
	function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    document.getElementById('container').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	
}

function fillField(kebun,afd,asisten,tanggalpanen,pemanen,nopemanen,tph,jjg_ast,jjg_pnn)
{
    document.getElementById('kebun').value=kebun;
    document.getElementById('kebun').disabled=true
    document.getElementById('afd').value=afd;
    document.getElementById('old_afd').value=afd;
    document.getElementById('asisten').value=asisten;
    document.getElementById('old_ast').value=asisten;
    document.getElementById('tanggalpanen').value=tanggalpanen;
    document.getElementById('pemanen').value=pemanen;
    document.getElementById('oldpemanen').value=pemanen;
    document.getElementById('nopemanen').value=nopemanen;
    document.getElementById('tph').value=tph;
    document.getElementById('old_tph').value=tph;
    document.getElementById('jjg_ast').value=jjg_ast;
    document.getElementById('jjg_pnn').value=jjg_pnn;
    document.getElementById('method').value="update";
//    tabAction(document.getElementById('tabFRM0'),0,'FRM',1);
}

function del(kebun,afd,asisten,tanggalpanen,pemanen,nopemanen,tph,jjg_ast,jjg_pnn)
{
    param='kebun='+kebun+'&afd='+afd+'&asisten='+asisten+'&tanggalpanen='+tanggalpanen+'&pemanen='+pemanen+
          '&nopemanen='+nopemanen+'&tph='+tph+'&jjg_ast='+jjg_ast+'&jjg_pnn='+jjg_pnn+'&method=deletedata';
    tujuan='kebun_slave_periksabuah.php';
    if(confirm("Are You Sure Want Delete Data?"))
        post_response_text(tujuan, param, respog);
				
    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    loadData();
                    document.getElementById('pemanen').value='';
                    document.getElementById('nopemanen').value='';
                    document.getElementById('tph').value='';
                    document.getElementById('jjg_ast').value='';
                    document.getElementById('jjg_pnn').value='';
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }		
}

function cancelIsi()
{
    document.getElementById('pemanen').value='';
    document.getElementById('oldpemanen').value='';
    document.getElementById('nopemanen').value='';
    document.getElementById('tph').value='';    
    document.getElementById('old_tph').value='';
    document.getElementById('jjg_ast').value='';
    document.getElementById('jjg_pnn').value='';
    document.getElementById('method').value="insert";
}

function caritph()
{
    cariafd=document.getElementById('cariafd').value;
    cariasisten=document.getElementById('cariasisten').value;
    caritgl=document.getElementById('caritgl').value;
    param='cariafd='+cariafd+'&cariasisten='+cariasisten+'&caritgl='+caritgl+'&method=caritph';
    tujuan='kebun_slave_periksabuah.php';
    post_response_text(tujuan,param, respog);
     
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    document.getElementById('container').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  		
}

