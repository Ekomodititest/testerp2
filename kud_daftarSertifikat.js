// JavaScript Document
function loadData()
{
	param='proses=loadData';
	tujuan='kud_slave_daftarSertifikat.php';
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
function add_new_data()
{
	document.getElementById('list_ganti').style.display='none';
	document.getElementById('headher').style.display='block';
	//document.getElementById('trans_no').disabled= true;
	bersihForm();
}
function bersihForm()
{
	document.getElementById('nosertifi').disabled=false;
	document.getElementById('nosertifi').value='';
	document.getElementById('idKbn').value='';
	document.getElementById('tglSer').value='';
	document.getElementById('las').value='0';
	document.getElementById('thp').value='';
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
		prode=document.getElementById('periode').value;
		thntnm=document.getElementById('thnTnm').value;
		idkbn=document.getElementById('idKbn').value;
		delDataC(prode,idkbn,thntnm);
		//displayList();
	}
	else if(prose=='update')
	{
		displayList();
	}
}
function saveData()
{
	noSertifikat=document.getElementById('nosertifi').value;
	kdOrg=document.getElementById('idKbn').value;
	tglSertifikat=document.getElementById('tglSer').value;
	Luas=document.getElementById('las').value;
	taHap=document.getElementById('thp').value;
	prose=document.getElementById('proses').value;
	param='noSertifikat='+noSertifikat+'&kdOrg='+kdOrg+'&tglSertifikat='+tglSertifikat+'&Luas='+Luas+'&taHap='+taHap;
	param +='&proses='+prose;
	//alert(param);
	tujuan='kud_slave_daftarSertifikat.php';
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
function fillField(nosertifikat)
{
	noSertifikat=nosertifikat;
	param='noSertifikat='+noSertifikat+'&proses=getData';
	tujuan='kud_slave_daftarSertifikat.php';
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
					document.getElementById('proses').value='update';
					ar=con.responseText.split("###");
					document.getElementById('nosertifi').value=ar[0];
					document.getElementById('idKbn').value=ar[1];
					document.getElementById('tglSer').value=ar[2];
					document.getElementById('las').value=ar[3];
					document.getElementById('thp').value=ar[4];
					document.getElementById('list_ganti').style.display='none';
					document.getElementById('headher').style.display='block';
					document.getElementById('nosertifi').disabled=true;					
	             }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	post_response_text(tujuan, param, respon);
	
}
function delData(nosertifikat)
{
	noSertifikat=nosertifikat;
	param='noSertifikat='+noSertifikat+'&proses=delData';
	tujuan='kud_slave_daftarSertifikat.php';
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
function delDataC(nosertifikat)
{
	noSertifikat=nosertifikat;
	param='noSertifikat='+noSertifikat+'&proses=delData';
	tujuan='kud_slave_daftarSertifikat.php';
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
	
	param='txtSearch='+txtSearch+'&txtTgl='+txtTgl+'&proses=cari_transaksi';
	//alert(param);
	tujuan='kud_slave_daftarSertifikat.php';
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
function cariBast(num)
{
		param='proses=loadData';
		param+='&page='+num;
		tujuan = 'kud_slave_daftarSertifikat.php';
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