/**
 * @author Developer
 */

function editPPJD(notransaksi)
{
	param ='notransaksi='+notransaksi;
	tujuan = 'sdm_slave_saveVerPrtjwbPJDinas.php';
	post_response_text(tujuan, param, respog);
	tabAction(document.getElementById('tabFRM0'),1,'FRM',0);
    document.getElementById('notransaksi').value=notransaksi; 
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('innercontainer').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function previewPJD(nosk,ev)
{
   	param='notransaksi='+nosk;
	tujuan = 'sdm_slave_printPtjwbPJD_pdf.php?'+param;	
 //display window
   title=nosk;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);
   
}

function saveApprvPJD(jenisby,notransaksi,tanggal,jumlah,no)
{
	jumlahhrd= remove_comma(document.getElementById('jumlahhrd'+jenisby+no));
	cnfsimpan= document.getElementById('cnfsimpan').value;
	altsimpan= document.getElementById('altsimpan').value;
	if(jumlahhrd=='')
	{
		alert('Amount is empty');
	}
	else
	{
			param ='notransaksi='+notransaksi+'&jenisby='+jenisby; 
			param +='&jumlahhrd='+jumlahhrd+'&method=update&tanggal='+tanggal+'&jumlah='+jumlah;
			if (confirm(cnfsimpan)) {
				tujuan = 'sdm_slave_saveVerPrtjwbPJDinas.php';
				post_response_text(tujuan, param, respog);
			}
		}
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('jumlahhrd'+jenisby).style.backgroundColor='#dedede';
					alert(altsimpan);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
		
}

//tambah fungsi untuk save all ==Jo 07-12-2016==
function pdinasColor(no,color)
{
        document.getElementById('no' + no).style.backgroundColor=color;
        document.getElementById('jns' + no).style.backgroundColor=color;
        document.getElementById('tgl' + no).style.backgroundColor=color;
        document.getElementById('ket' + no).style.backgroundColor=color;
        document.getElementById('jml' + no).style.backgroundColor=color;
        document.getElementById('jmlh' + no).style.backgroundColor=color;
}


function saveAll(max){
	cnfsimpan= document.getElementById('cnfsimpan').value;
	if (confirm(cnfsimpan)) {
		jumldata=0;
		dosaveAll(max);
	}
}

function dosaveAll(max){
	 jumldata+=1;
        if (jumldata <= max) {
			notransaksi=document.getElementById('notranss'+jumldata).value;
			
			jenisby=document.getElementById('jnss'+jumldata).value;
			jumlah=document.getElementById('jmls'+jumldata).value;
			tanggal=document.getElementById('tgls'+jumldata).value;
			bid=document.getElementById('bids'+jumldata).value;
			jumlahhrd=remove_comma(document.getElementById('jumlahhrd'+bid+jumldata));
			pdinasColor(jumldata, 'orange');
					
			param = 'notransaksi=' + notransaksi + '&jenisby=' + bid+ '&jumlah=' + jumlah+ '&jumlahhrd=' + jumlahhrd+ '&tanggal=' + tanggal+ '&method=update';

			post_response_text('sdm_slave_saveVerPrtjwbPJDinas.php', param, respon);
        }
        else
        {
			selesai();
        }
   function respon(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
										pdinasColor(jumldata,'red');
								}
				else {
							pdinasColor(jumldata,'#dedede');
							dosaveAll(max);
						}
				
				
				
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}

function selesai()
{
  notransaksi=document.getElementById('notransaksi').value;
  tujuan = 'sdm_slave_saveVerPrtjwbPJDinas.php';
  param='notransaksi='+notransaksi+'&method=finish';
  post_response_text(tujuan, param, respog);
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					  document.getElementById('innercontainer').innerHTML='';
					  document.getElementById('notransaksi').value='';
					  loadList();
					  tabAction(document.getElementById('tabFRM0'),0,'FRM',1);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	 
 	
}
function batalkan()
{
	  document.getElementById('innercontainer').innerHTML='';
	  document.getElementById('notransaksi').value='';
	  loadList();
	  tabAction(document.getElementById('tabFRM0'),0,'FRM',1);
	
}
function loadList()
{      num=0;
	 	param='&page='+num;
		tujuan = 'sdm_getVerPJDinasPertgjwbList.php';
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
					
function cariPJD(num)
{
	tex=trim(document.getElementById('txtbabp').value);	
	nama=trim(document.getElementById('nama').value);

		param='&page='+num;
		if(tex!='')
			param+='&tex='+tex;
		if(nama!='')
			param+='&nama='+nama;
		tujuan = 'sdm_getVerPJDinasPertgjwbList.php';
		
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



