// JavaScript Document
function loadData()
{
	param='proses=loadData';
	tujuan='kud_slave_pembayaranKomisi.php';
	post_response_text(tujuan, param, respon);
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
					//alert(con.responseText);
					document.getElementById('list_ganti').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	
}
function cariBast(num)
{
		param='proses=loadData';
		param+='&page='+num;
		tujuan = 'kud_slave_pembayaranKomisi.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('list_ganti').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}
function add_new_data()
{
	document.getElementById('list_ganti').style.display='none';
	document.getElementById('headher').style.display='block';
	//document.getElementById('trans_no').disabled= true;
	bersihForm();	
}
function bersihForm()
{
	document.getElementById('noTrans').value='';
	document.getElementById('idPemilik').value='';
	document.getElementById('idCer').innerHTML='';
	document.getElementById('tglPembyrn').value='';
	document.getElementById('nmPenerima').value='';
	document.getElementById('dByrOlh').value='';
	document.getElementById('mngthi').value='';
	document.getElementById('jMlh').value='0';
	document.getElementById('noTrans').disabled=false;
	document.getElementById('idPemilik').disabled=false;
	document.getElementById('idCer').disabled=false;
	document.getElementById('period').disabled=false;
}
function displayList()
{
	document.getElementById('list_ganti').style.display='block';
	document.getElementById('headher').style.display='none';
	loadData();
	document.getElementById('txtsearch').value='';
	document.getElementById('tgl_cari').value='';
}

function cancelSave()
{
	prose=document.getElementById('proses').value;
	if(prose=='insert')
	{
		idPem=document.getElementById('idpemilik').value;
		delDataC(idPem);
		//displayList();
	}
	else if(prose=='update')
	{
		displayList();
	}
}
function saveData()
{
	noTrans=document.getElementById('noTrans').value;
	idPemilik=document.getElementById('idPemilik').value;
	idCer=document.getElementById('idCer').value;
	tglPembyrn=document.getElementById('tglPembyrn').value;
	period=document.getElementById('period').value;
	nmPenerima=document.getElementById('nmPenerima').value;
	dByrOlh=document.getElementById('dByrOlh').value;
	mngthi=document.getElementById('mngthi').value;
	jMlh=document.getElementById('jMlh').value;
	prose=document.getElementById('proses').value;
	param='noTrans='+noTrans+'&idPemilik='+idPemilik+'&idCer='+idCer+'&nmPenerima='+nmPenerima+'&dByrOlh='+dByrOlh+'&mngthi='+mngthi+'&jMlh='+jMlh;
	param +='&proses='+prose+'&tglPembyrn='+tglPembyrn+'&period='+period;
//	alert(param);
	tujuan='kud_slave_pembayaranKomisi.php';
	post_response_text(tujuan, param, respon);
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
					//alert(con.responseText);
					displayList();
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
}
function fillField(notrans)
{
	noTrans=notrans;
	param='noTrans='+noTrans+'&proses=getData';
	tujuan='kud_slave_pembayaranKomisi.php';
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
					document.getElementById('list_ganti').style.display='none';
					document.getElementById('headher').style.display='block';
					document.getElementById('proses').value='update';
					ar=con.responseText.split("###");
					document.getElementById('noTrans').value=ar[0];
					document.getElementById('noTrans').disabled=true;
					document.getElementById('idCer').disabled=true;
					document.getElementById('period').disabled=true;
					document.getElementById('idPemilik').disabled=true;
					document.getElementById('idPemilik').value=ar[3];
					document.getElementById('tglPembyrn').value=ar[2];
					document.getElementById('period').value=ar[4];
					document.getElementById('nmPenerima').value=ar[5];
					document.getElementById('dByrOlh').value=ar[6];
					document.getElementById('mngthi').value=ar[7];
					document.getElementById('jMlh').value=ar[8];
						getCer(ar[1],ar[3]);
	             }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	post_response_text(tujuan, param, respon);
	
}
function delData(notrans)
{
	noTrans=notrans;
	param='noTrans='+noTrans+'&proses=delData';
	tujuan='kud_slave_pembayaranKomisi.php';
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
						displayList();
						
	             }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	if(confirm("Are You Sure Want Delete This Data !!!"))
	post_response_text(tujuan, param, respon);
	
}
function delDataC(idPem)
{
	idPemilik=idPem;
	param='idPemilik='+idPemilik+'&proses=delData';
	tujuan='kud_slave_daftarPemilik.php';
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
						displayList();
						
	             }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	if(confirm("Are You Sure Want Delete This Data !!!"))
	post_response_text(tujuan, param, respon);
}
function cariTransaksi()
{
	txtSearch=document.getElementById('txtsearch').value;
	txtTgl=document.getElementById('tgl_cari').value;
	
	param='txtSearch='+txtSearch+'&txtTgl='+txtTgl+'&proses=cariTransaksi';
	//alert(param);
	tujuan='kud_slave_pembayaranKomisi.php';
	post_response_text(tujuan, param, respog);			
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('list_ganti').style.display='block';
						document.getElementById('headher').style.display='none';
						document.getElementById('list_ganti').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}
function dataKeExcel(ev,tujuan)
{
	judul=jdlExcel;
	//alert(param);	
	param='';
	printFile(param,tujuan,judul,ev)	
}
function printFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}
function getCer(nocer,idpemilik)
{
	if((nocer==0)&&(idpemilik==0))
	{
		idPemilik=document.getElementById('idPemilik').value;
		param='idPemilik='+idPemilik+'&proses=getCertificate';
	}
	else
	{
		idPemilik=idpemilik;
		noCer=nocer;
		param='idPemilik='+idPemilik+'&proses=getCertificate'+'&noCer='+noCer;		
	}
	//alert(param);
	tujuan='kud_slave_pembayaranKomisi.php';
	post_response_text(tujuan, param, respon);
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
					//alert(con.responseText);
					document.getElementById('idCer').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
}
function UbhStat(notrans)
{
	noTrans=notrans;
	param='noTrans='+noTrans+'&proses=getStat';
	tujuan='kud_slave_pembayaranKomisi.php';

	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
					//alert(con.responseText);
					displayList();
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	if(confirm("Are you sure want change the Status this transaction"))
	post_response_text(tujuan, param, respon);
}