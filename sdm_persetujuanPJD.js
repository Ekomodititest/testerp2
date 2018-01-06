/**
 * @author Developer
 */

function approvePJD(notransaksi,karyawanid,status,kolom)
{      
		cnfsimpan=document.getElementById('cnfsimpan').value;
		cnftolak=document.getElementById('cnftolak').value;
		alselesai=document.getElementById('alselesai').value;
	 	param='notransaksi='+notransaksi+'&karyawanid='+karyawanid+'&status='+status+'&kolom='+kolom;
		tujuan = 'sdm_slave_PJDinasApproval.php';
		if(status==1){
			//comment=' Approve ';
			cnf=cnfsimpan;
		}
		   
		else{
			//comment=' Reject ';
			cnf=cnftolak;
		}
		    
		//if(confirm('Are you sure '+comment+' '+notransaksi+' ?'))
		if(confirm(cnf))
		     post_response_text(tujuan, param, respog);
			
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					alert(alselesai);
					window.location.reload();
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}				
}
					
function cariPJD(num)
{
	tex=trim(document.getElementById('txtbabp').value);
	nama=trim(document.getElementById('nama').value);
		param='&page='+num;
		if(tex!='')
			param+='&tex='+tex;
		if(nama!='')
			param+='&nama='+nama;
		tujuan = 'sdm_slave_getPJDListApproval.php';
		
		post_response_text(tujuan, param, respog);			
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containerlist').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}

function previewPJD(notransaksi,ev)
{
   	param='notransaksi='+notransaksi;
	tujuan = 'sdm_slave_getPersetujuanPJDPreview.php?'+param;	
		post_response_text(tujuan, param, respog);			
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						   title=notransaksi;
						   width='600';
						   height='300';
						   content=con.responseText;
						   showDialog1(title,content,width,height,ev);					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
	
}

function saveUpdateValPJD()
{
	newVal=document.getElementById('newvalpjd').value;
	notransaksi=document.getElementById('nitransaksipjd').value;
	
	param='newvalpjd='+newVal+'&notransaksi='+notransaksi;
	tujuan = 'sdm_slave_saveUpdateValPJD.php?'+param;	
		post_response_text(tujuan, param, respog);			
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
                          document.getElementById('oldval').innerHTML=con.responseText;
						  alert('Done');					
				 }
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}		
	
}

function previewPJDPDF(nosk,ev)
{
   	param='notransaksi='+nosk;
	tujuan = 'sdm_slave_printPJD_pdf.php?'+param;	
 //display window
   title=nosk;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);
   
}
function showAppForward(notrans,ev)
{
		
        //title="Forward Approval";
		titles=document.getElementById('trskpd').value;
        title=titles+": ";
        content="<div id=contentForm></div>";
        width='350';
        height='110';
        showDialog1(title,content,width,height,ev);	
}

function showAppForw(notrans,ev)
{
    showAppForward(notrans,ev)


    param='proses=formForward'+'&notransaksi='+notrans;
    tujuan = 'sdm_slave_PJDinasApproval.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                            document.getElementById('contentForm').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }

}
function AppForw()
{
	alselesai=document.getElementById('alselesai').value;
    krywnId=document.getElementById('karyaid').value;
    notrans=document.getElementById('notrans').value;
    ats=document.getElementById('karywanId').options[document.getElementById('karywanId').selectedIndex].value;
    param='proses=forwardData'+'&notransaksi='+notrans+'&krywnId='+krywnId+'&atasan='+ats;
    tujuan = 'sdm_slave_PJDinasApproval.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                            alert(alselesai);
                                            closeDialog();
											window.location.reload();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
}
