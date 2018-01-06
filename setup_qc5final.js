// JavaScript Document
function saveFranco(fileTarget,passParam) {
	
    var passP = passParam.split('##');
    var param = "";
	
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }
    met=document.getElementById('method').value;
    if(met=='updateData')
        {
            nm=document.getElementById('nmQcOld').value;
            param+='&nmQcOld='+nm;
        }
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    //var res = document.getElementById(idCont);
//                    res.innerHTML = con.responseText;
						loadData();
						cancelIsi();
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    //
  //  alert(fileTarget+'.php?proses=preview', param, respon);
    post_response_text(fileTarget+'.php', param, respon);

}
function loadData()
{
	param='method=loadData';
	tujuan='setup_slave_5qcfinal';
    post_response_text(tujuan+'.php', param, respon);
	function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    //var res = document.getElementById(idCont);
//                    res.innerHTML = con.responseText;
					  document.getElementById('container').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	
}

function fillField( nama,kelompok,satuan)
{
    document.getElementById('wrnaId').value=kelompok;
    document.getElementById('nmQc').value=nama;
    document.getElementById('nmQcOld').value=nama;
    document.getElementById('maxDt').value=satuan;
    document.getElementById('method').value='updateData';
}
function cancelIsi()
{
    document.getElementById('wrnaId').value='';
    document.getElementById('nmQc').value='';
    document.getElementById('maxDt').value='';
    document.getElementById('nmQcOld').value='';
    document.getElementById('method').value="insert";

}