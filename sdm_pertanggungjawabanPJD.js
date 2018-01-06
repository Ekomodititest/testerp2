/**
 * @author Developer
 */
function savePPJD()
{
	cnfsimpan	= document.getElementById('cnfsimpan').value;
	alsimpan	= document.getElementById('alsimpan').value;
	notransaksi	= document.getElementById('notransaksi');
	notransaksi	=notransaksi.options[notransaksi.selectedIndex].value;
	
	tanggal		= document.getElementById('tanggal').value;
	jenisby		= document.getElementById('jenisby');
	jenisby		=jenisby.options[jenisby.selectedIndex].value;
	keterangan	= document.getElementById('keterangan').value;
	jumlah		= remove_comma(document.getElementById('jumlah'));
	method		= document.getElementById('method').value;
 
		if (notransaksi == '' || tanggal == '' || jenisby=='') {
			alert('No. Transaksi,Tanggal dan Jenis Biaya harus diisi');
		}
		else {
			param ='notransaksi='+notransaksi+'&tanggal='+tanggal;
			param +='&jenisby='+jenisby+'&keterangan='+keterangan; 
			param +='&jumlah='+jumlah+'&method='+method;
			if (confirm(cnfsimpan)) {
				tujuan = 'sdm_slave_savePertanggungjawabanPJDinas.php';
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
					document.getElementById('innercontainer').innerHTML=con.responseText;
					alert(alsimpan);
					clearForm();
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
	 nosk=notransaksi;	
	param='notransaksi='+nosk;
	tujuan = 'sdm_slave_printPtjwbPJD_pdf.php?'+param;	
 //display window
   title=nosk;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);
   
}
function simpanUraianPjDinas()
{
	cnfsimpan	= document.getElementById('cnfsimpan').value;
	alsimpan	= document.getElementById('alsimpan').value;
	notransaksi	= document.getElementById('notransaksi1');
	notransaksi	=notransaksi.options[notransaksi.selectedIndex].value;	
	jenisprtng	= document.getElementById('jenisprtng');
	jenisprtng	=jenisprtng.options[jenisprtng.selectedIndex].value;
	uraian=document.getElementById('uraian').value;
	if(notransaksi=='' || uraian=='')
	{
		alert('Transaction Number and Descaription are obligatory');
	}
	else
	{
	   param='notransaksi='+notransaksi+'&jenisprtng='+jenisprtng+'&uraian='+uraian;
			if (confirm(cnfsimpan)) {
				tujuan = 'sdm_slave_savePertanggungjawabanPJDinasUraian.php';
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
					alert(alsimpan);
					document.getElementById('uraian').value='';
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}		
}

function previewPJDUraian(notransaksi,ev)
{
	 nosk=notransaksi;	
	param='notransaksi='+nosk;
	tujuan = 'sdm_slave_printPtjwbPJDUraian_pdf.php?'+param;	
 //display window
   title=nosk;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);
   
}

function previewPJDOri(ev)
{
    try {
		nosk = document.getElementById('notransaksi').options[document.getElementById('notransaksi').selectedIndex].value;
	}
	catch(err)
	{
	 nosk='';	
	}
	param='notransaksi='+nosk;
	tujuan = 'sdm_slave_printPtjwbPJD_pdf.php?'+param;	
 //display window
   title=nosk;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);
   
}

function clearForm()
{
	notransaksi	= document.getElementById('notransaksi');
				notransaksi.options[0].selected=true;
	document.getElementById('tanggal').value='';
	jenisby		= document.getElementById('jenisby');
				jenisby.options[0].selected=true;
	document.getElementById('keterangan').value='';
	document.getElementById('jumlah').value=0;
}

function deleteDetail(notransaksi,jenisbiaya,tanggal,jumlah)
{
			param ='notransaksi='+notransaksi+'&jenisby='+jenisbiaya+'&method=delete&tanggal='+tanggal+'&jumlah='+jumlah;
			if (confirm('Anda yakin ingin menghapus data ini ?')) {
				tujuan = 'sdm_slave_savePertanggungjawabanPJDinas.php';
				post_response_text(tujuan, param, respog);
			}
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

function selesai()
{
  loadList();
  tabAction(document.getElementById('tabFRM2'),2,'FRM',2);	
}



function loadList()
{      num=0;
	 	param='&page='+num;
		tujuan = 'sdm_getPJDinasPertgjwbList.php';
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
		param='&page='+num;
		if(tex!='')
			param+='&tex='+tex;
		tujuan = 'sdm_getPJDinasPertgjwbList.php';
		
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

function cariPJDUraian(num)
{
	tex=trim(document.getElementById('txtbabp').value);
	nama=trim(document.getElementById('nama').value);
		param='&page='+num;
		if(tex!='')
			param+='&tex='+tex;
		if(nama!='')
			param+='&nama='+nama;
		tujuan = 'sdm_getPJDinasPertgjwbUraianList.php';
		
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
function editPPJD(notransaksi)
{
	param ='notransaksi='+notransaksi;
	tujuan = 'sdm_slave_savePertanggungjawabanPJDinas.php';
	post_response_text(tujuan, param, respog);
	tabAction(document.getElementById('tabFRM1'),1,'FRM',2);
		jk=document.getElementById('notransaksi');
		for(x=0;x<jk.length;x++)
		{
			if(jk.options[x].value==notransaksi)
			{
				jk.options[x].selected=true;
			}
		}
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
					tabAction(document.getElementById('tabFRM0'),0,'FRM',2);
					jk=document.getElementById('notransaksi');
					for(x=0;x<jk.length;x++)
					{
						if(jk.options[x].value==notransaksi)
						{
							jk.options[x].selected=true;
						}
					}
					loadUraian(notransaksi);
				}
				else {
					document.getElementById('innercontainer').innerHTML=con.responseText;
					loadUraian(notransaksi);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function showPPJDS()
{
	notransaksi = document.getElementById('notransaksi').options[document.getElementById('notransaksi').selectedIndex].value;
	param ='notransaksi='+notransaksi;
	tujuan = 'sdm_slave_savePertanggungjawabanPJDinas.php';
	post_response_text(tujuan, param, respog);
	tabAction(document.getElementById('tabFRM1'),1,'FRM',2);
		jk=document.getElementById('notransaksi');
		for(x=0;x<jk.length;x++)
		{
			if(jk.options[x].value==notransaksi)
			{
				jk.options[x].selected=true;
			}
		}
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
					tabAction(document.getElementById('tabFRM0'),0,'FRM',2);
					jk=document.getElementById('notransaksi');
					for(x=0;x<jk.length;x++)
					{
						if(jk.options[x].value==notransaksi)
						{
							jk.options[x].selected=true;
						}
					}
				}
				else {
					document.getElementById('innercontainer').innerHTML=con.responseText;
					loadUraian(notransaksi);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}


function loadUraian(notransaksi)
{
	param='notransaksi='+notransaksi;
	tujuan = 'sdm_slave_getPertanggungjawabanPJDinasUraian.php';
	post_response_text(tujuan, param, respog);
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
				document.getElementById('uraian').value=con.responseText;
				//alert(con.responseText);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}		
}

function loadUraians()
{
	notransaksi = document.getElementById('notransaksi1').options[document.getElementById('notransaksi1').selectedIndex].value;
	param='notransaksi='+notransaksi;
	tujuan = 'sdm_slave_getPertanggungjawabanPJDinasUraian.php';
	post_response_text(tujuan, param, respog);
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
				document.getElementById('uraian').value=con.responseText;
				//alert(con.responseText);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}		
}

