// JavaScript Document
function loadData()
{
	param='proses=loadData';
	tujuan='kud_slave_daftarPemilik.php';
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
		tujuan = 'kud_slave_daftarPemilik.php';
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
	param='proses=CekId';
	tujuan='kud_slave_daftarPemilik.php';
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
					document.getElementById('idpemilik').value=con.responseText;
					bersihForm();
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	
}
function bersihForm()
{
	document.getElementById('nama').value='';
	document.getElementById('tglLahir').value='';
	document.getElementById('ktp').value='';
	document.getElementById('almat').value='';
	document.getElementById('tlp').value='';
	document.getElementById('dsa').value='';
	document.getElementById('nmBank').value='';
	document.getElementById('atsNm').value='';
	document.getElementById('noRek').value='';
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
	nm=document.getElementById('nama').value;
	tglLahir=document.getElementById('tglLahir').value;
	ktp=document.getElementById('ktp').value;
	almat=document.getElementById('almat').value;
	tlp=document.getElementById('tlp').value;
	desa=document.getElementById('dsa').value;
	nmBank=document.getElementById('nmBank').value;
	atsNm=document.getElementById('atsNm').value;
	noRek=document.getElementById('noRek').value;
	jnsKlmn=document.getElementById('gen').value;
	prose=document.getElementById('proses').value;
	idPemilik=document.getElementById('idpemilik').value;
	param='nm='+nm+'&tglLahir='+tglLahir+'&ktp='+ktp+'&almat='+almat+'&tlp='+tlp+'&desa='+desa+'&nmBank='+nmBank+'&atsNm='+atsNm;
	param +='&proses='+prose+'&noRek='+noRek+'&jnsKlmn='+jnsKlmn+'&idPemilik='+idPemilik;
//	alert(param);
	tujuan='kud_slave_daftarPemilik.php';
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
function fillField(idpem)
{
	idPemilik=idpem;
	param='idPemilik='+idPemilik+'&proses=getData';
	tujuan='kud_slave_daftarPemilik.php';
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
					document.getElementById('nama').value=ar[0];
					document.getElementById('tglLahir').value=ar[2];
					document.getElementById('ktp').value=ar[3];
					document.getElementById('idpemilik').value=ar[4];
					document.getElementById('almat').value=ar[5];
					document.getElementById('tlp').value=ar[6];
					document.getElementById('dsa').value=ar[7];
					document.getElementById('nmBank').value=ar[8];
					document.getElementById('atsNm').value=ar[9];
					document.getElementById('noRek').value=ar[10];
					document.getElementById('gen').value=ar[1];				
	             }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
	post_response_text(tujuan, param, respon);
	
}
function delData(idPem)
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
	
	param='txtSearch='+txtSearch+'&txtTgl='+txtTgl+'&proses=cariPemilik';
	//alert(param);
	tujuan='kud_slave_daftarPemilik.php';
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