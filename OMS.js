
function addRow(inc){
	inc=inc+1;
	$(".item-row:last").after('<tr class="item-row"><td><input disabled=disabled type=text id="kodebarang_'+inc+'" name="kodebarang[]" class=myinputtext style=width:100px; onkeypress="return tanpa_kutip(event)" maxlength=100/></td><td><input disabled=disabled type=text id="namabarang_'+inc+'" name="namabarang[]" class=myinputtext style=width:200px; onkeypress="return tanpa_kutip(event)" maxlength=100/></td><td><input disabled=disabled type=text id="satuan_'+inc+'" name="satuan[]" class=myinputtext style=width:100px; onkeypress="return tanpa_kutip(event)" maxlength=100/><img class=\"dellicon\" src=\"images/zoom.png\" onclick=\"searchbrg('+inc+',event)\"/></td><td><input type="text" id="qty_'+(inc)+'" name="qty[]" class="myinputtextnumber qty" onblur="change_number(this)" onkeypress="return angka_doang(event);" value="0"  style=width:80px; ></td><td><input type="text" id="keterangan_'+(inc)+'" name="keterangan[]" class=myinputtext style=width:200px; onkeypress=\"return tanpa_kutip(event)\" maxlength=100/></td><td><input type="button" name="tambah" value="+" onclick="addRow('+inc+');" class="addrow"/> <input type="button" name="hapus" value="-" onclick="hapus(this);" class="hapus"/></td></tr>');
	$(".hapus"+inc).hide()
}
function resetDetail(){
	location.reload();
}
function resetKegiatan(){
	document.getElementById('notransaksi1').value="";
	document.getElementById('pilihorganisasi').value="";
	document.getElementById('pilihperiode').value="";	
	document.getElementById('pilihtipe').value="";	
	document.getElementById('namakegiatan').value="";
	document.getElementById('optoperation1').value="";
	document.getElementById('optoperation2').value="";
	document.getElementById('pilihjenis1');
	document.getElementById('pilihjenis3').value="";
	document.getElementById('jumlahsdm').value=0;
	document.getElementById('pilihkma').value="";
	document.getElementById('hasilkerja').value=0;
	document.getElementById('tanggalmulai').value="";
	document.getElementById('runninghours').value="";
	document.getElementById('method').value="INSERTHEADER";

	document.getElementById('tanggalsampai').value="";
	document.getElementById('totLembur').value=0;
	document.getElementById('pilihjam1').value="00";
	document.getElementById('pilihmenit1').value="00";
	document.getElementById('pilihdetik1').value="00";
	document.getElementById('pilihjam2').value="00";
	document.getElementById('pilihmenit2').value="00";
	document.getElementById('pilihdetik2').value="00";
	document.getElementById('vhc_kmhm_awal').value=0;
	document.getElementById('vhc_kmhm_akhir').value=0;
	document.getElementById('keterangan').value="";
	document.getElementById('keterangandetail').value="";
	
	tabAction(document.getElementById('tabFRM1'),0,'FRM',1);
}

function lanjutKegiatan(){
	tabAction(document.getElementById('tabFRM1'),1,'FRM',1);									
}

function hapus(row) {
	var rowCount 	= document.getElementById('dataTable1').rows.length;
	if(rowCount>1){
		$(row).parent().parent().remove();
	}else{
		$(row).parent().parent().remove();
		getShowDetail();
	}
}

function savingdetail(){
	var rowCount 	= document.getElementById('dataTable1').rows.length;
	var notransaksi	= document.getElementById('notransaksi').value;
		
	var seqno=[];
	var kodebarang=[];
	var namabarang=[];
	var satuan=[];
	var qty=[];
	var keterangan=[];
	y=0;
	for (i = 1; i < rowCount; i++) { 
		var kodebarang1	= document.getElementById('kodebarang_'+i).value;
		var namabarang1	= document.getElementById('namabarang_'+i).value;
		var satuan1 		= document.getElementById('satuan_'+i).value;
		var qty1 		= remove_comma(document.getElementById('qty_'+i));
		var keterangan1  = document.getElementById('keterangan_'+i).value;
		if(kodebarang1!=""){
			if (qty1!=0 && qty1!=""){
				kodebarang[y]=kodebarang1;
				namabarang[y]=namabarang1;
				satuan[y]=satuan1;
				qty[y]=qty1;
				keterangan[y]=keterangan1;
				y++;
			}
		}
	}
	
		param="method=SIMPANDETAIL&notransaksi="+notransaksi+"&kodebarang="+JSON.stringify(kodebarang)+"&namabarang="+JSON.stringify(namabarang)+"&satuan="+JSON.stringify(satuan)+"&qty="+JSON.stringify(qty)+"&keterangan="+JSON.stringify(keterangan);
		tujuan= 'traksi_slave_OMS.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
		  if(con.readyState==4)
		  {
			if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									document.getElementById('contDetails').innerHTML=con.responseText;
							}
							else {
								var a=con.responseText.split("|");
									alert(a[0]);
							}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
		  }	
         }   
	 
}

function getShowDetail(notransaksi){
	param="method=SHOWDETAIL&notransaksi="+notransaksi;
	tujuan='traksi_slave_OMS.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
				  if(con.readyState==4)
				  {
							if (con.status == 200) {
											busy_off();
											if (!isSaveResponse(con.responseText)) {
													document.getElementById('containerdetail').innerHTML=con.responseText;
											}
											else {
												document.getElementById('containerdetail').innerHTML=con.responseText;
											}
									}
									else {
											busy_off();
											error_catch(con.status);
									}
				  }	
	 }   
}

function dblClick(hrow,row,kodebarang,namabarang,satuan){
	document.getElementById('kodebarang_'+hrow).value=kodebarang;
	document.getElementById('namabarang_'+hrow).value=namabarang;
	document.getElementById('satuan_'+hrow).value=satuan;
}

function searchbrg(irow,ev)
{  
        showDetail(ev);
		param="method=CARIBARANG&row="+irow;
		tujuan='traksi_slave_OMS.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        document.getElementById('contDetails').innerHTML=con.responseText;
                                                }
                                                else {
													document.getElementById('contDetails').innerHTML=con.responseText;
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }   
}


function showDetail(ev)
{
title="Cari Barang";
content="<fieldset><legend></legend><div id=contDetails style='overflow:auto; width:100%; height:100%;' ></div></fieldset>";
width='600';
height='400';
showDialog1(title,content,width,height,ev);	
}

function numchange(){
	document.getElementById('notransaksi').value=document.getElementById('notransaksi1').value;
	document.getElementById('lblpesan').style.display = '';
	document.getElementById("simpan2").disabled = true;
	if (document.getElementById('notransaksi').value!=''){
		document.getElementById('lblpesan').style.display = 'none';
		document.getElementById("simpan2").disabled = false;
	}
}

function editkegiatan(notransaksi){
		
	param='method=GETHEADER&notransaksi='+notransaksi;
	tujuan='traksi_slave_OMS.php';
    post_response_text(tujuan, param, respog);	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									document.getElementById('form').style.display = '';
									document.getElementById('listdata').style.display = 'none';
									tabAction(document.getElementById('tabFRM1'),0,'FRM',1);
									document.getElementById('method').value='UPDATEHEADER';
									var a=con.responseText.split('|');
									document.getElementById('notransaksi1').value=a[0];
									document.getElementById('notransaksi').value=a[0];
							
									optTipe1=document.getElementById('pilihorganisasi');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[1] || optTipe1.options[x].text==a[1])
											   optTipe1.options[x].selected=true;
									}
									optTipe1=document.getElementById('pilihperiode');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[7] || optTipe1.options[x].text==a[7])
											   optTipe1.options[x].selected=true;
									}
									optTipe1=document.getElementById('pilihtipe');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[3] || optTipe1.options[x].text==a[3])
											   optTipe1.options[x].selected=true;
									}									
																	
									var str=document.getElementById('pilihtipe').value;
									
									var z = document.getElementById("pilihjenis3");
									while(z.length > 0) {
											z.remove(z.length-1);
									}
									
									var y = document.getElementById("pilihjenis1");
									
									if(str=='OMS')
									{
										y = document.getElementById("pilihjenis2");
									}	
									
									for(i = 0; i < y.length; i++)
									{
										var option = document.createElement("option");
											y.selectedIndex = i;
											option.text = y.options[i].text;
											z.add(option,y.options[i].value);
									}
									
									optTipe1=document.getElementById('pilihjenis3');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[6] || optTipe1.options[x].text==a[6])
											   optTipe1.options[x].selected=true;
									}
									
									
									document.getElementById('namakegiatan').value=a[19];
									
									optTipe1=document.getElementById('optoperation1');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[19] || optTipe1.options[x].text==a[19]){
											   optTipe1.options[x].selected=true;
											}
									}
									optTipe1=document.getElementById('optoperation2');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[19] || optTipe1.options[x].text==a[19]){
											   optTipe1.options[x].selected=true;
											}
									}
									
									if(str=='OMS')
									{
										document.getElementById('namakegiatan').hidden=false;
										document.getElementById('optoperation1').hidden=true;
										document.getElementById('optoperation2').hidden=true;
										
									}else{										
										var pilih=document.getElementById('pilihjenis3').value;
										if(pilih=='Service' || pilih=='S')
										{
											document.getElementById('namakegiatan').hidden = true;
											document.getElementById('optoperation1').hidden = false;//service
											document.getElementById('optoperation2').hidden = true;//maintenance
										}	
										if(pilih=='Maintenance' || pilih=='M')
										{
											document.getElementById('namakegiatan').hidden = true;
											document.getElementById('optoperation1').hidden = true;//service
											document.getElementById('optoperation2').hidden = false;//maintenance
										}											
									}
									
									optTipe1=document.getElementById('pilihkma');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[8] || optTipe1.options[x].text==a[8]){
											   optTipe1.options[x].selected=true;
											}
									}
									document.getElementById('tanggalmulai').value=a[10];
									document.getElementById('tanggalsampai').value=a[11];
									
									document.getElementById('pilihjam1').value=a[12];							
									document.getElementById('pilihmenit1').value=a[13];
									document.getElementById('pilihdetik1').value=a[14];
									document.getElementById('pilihjam2').value=a[15] ;
									document.getElementById('pilihmenit2').value=a[16] ;
									document.getElementById('pilihdetik2').value=a[17] ;
									
									document.getElementById('keterangan').value=a[18];
									document.getElementById('jumlahsdm').value=a[21];
									document.getElementById('hasilkerja').value=a[22];
									document.getElementById('runninghours').value=a[23];
									document.getElementById('totLembur').value=a[24];
									document.getElementById('vhc_kmhm_awal').value=a[25];
									document.getElementById('vhc_kmhm_akhir').value=a[26];
									document.getElementById('keterangandetail').value=a[27];
									numchange();
									getShowDetail(document.getElementById('notransaksi').value);
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	} 
	   
}
function hapuskegiatan(notransaksi){
		
		param='method=DELETEHEADER&notransaksi='+notransaksi;
		tujuan='traksi_slave_OMS.php';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan, param, respog);	
	}else
	{
		return;
	}		
		function respog(){
			if(con.readyState==4){
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
											alert('ERROR\n' + con.responseText);
									}
									else {
										
										var a=con.responseText.split('|');
										alert(a[0]);
										loadData();
										//document.getElementById('notransaksi').value=a[1];
										
									}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
			}	
		}  
	   
}

function saveKegiatan(){	
	var notransaksi=document.getElementById('notransaksi1').value;
	var kodeorganisasi=document.getElementById('pilihorganisasi').value;	
	if(kodeorganisasi=='') {
		alert(document.getElementById('kodeorganisasi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	var periode=document.getElementById('pilihperiode').value;	
	if(pilihperiode=='') {
		alert(document.getElementById('pilihperiode').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	var tipetransaksi=document.getElementById('pilihtipe').value;	
	if(tipetransaksi=='') {
		alert(document.getElementById('tipetransaksi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	var kodekegiatan;
	kodekegiatan=""
	if (document.getElementById('namakegiatan').hidden==false){
		kodekegiatan=document.getElementById('namakegiatan').value;
	}
	
	if (document.getElementById('optoperation1').hidden==false){
		kodekegiatan=document.getElementById('optoperation1').value;
	}
	
	if (document.getElementById('optoperation2').hidden==false){
		kodekegiatan=document.getElementById('optoperation2').value;
	}	
	
	var z=document.getElementById('pilihjenis1');
	var y=document.getElementById('pilihjenis2');
	var data=document.getElementById('pilihjenis3').value;
	var jenistransaksi;
	jenistransaksi="";
	for(i = 0; i < y.length; i++)
	{		
		if (y.options[i].value==data || y.options[i].text==data){
			y.selectedIndex = i;
			jenistransaksi=y.options[i].value;
		}
	}
	
	if(jenistransaksi==""){		
		for(i = 0; i < z.length; i++)
		{			
			if (z.options[i].value==data || z.options[i].text==data){
				z.selectedIndex = i;
				jenistransaksi=z.options[i].value;
			}
		}
	}
	
		
	
	var jumlahsdm=remove_comma(document.getElementById('jumlahsdm'));
	var kodekma=document.getElementById('pilihkma').value;
	var hasilkerja=remove_comma(document.getElementById('hasilkerja'));
	var tanggalmulai=document.getElementById('tanggalmulai').value;
	var jampemakaian=remove_comma(document.getElementById('runninghours'));
	var method=document.getElementById('method').value;

	var tanggalselesai=document.getElementById('tanggalsampai').value;
	var totaljamlembur=remove_comma(document.getElementById('totLembur'));
	var jam1=document.getElementById('pilihjam1').value;
	var menit1=document.getElementById('pilihmenit1').value;
	var detik1=document.getElementById('pilihdetik1').value;
	
	var kwhawal=remove_comma(document.getElementById('vhc_kmhm_awal'));
	var jam2=document.getElementById('pilihjam2').value;
	var menit2=document.getElementById('pilihmenit2').value;
	var detik2=document.getElementById('pilihdetik2').value;

	var kwhakhir=remove_comma(document.getElementById('vhc_kmhm_akhir'));
	var keterangan1=document.getElementById('keterangan').value;
	var keterangandetail=document.getElementById('keterangandetail').value;
	
		param='method='+method+
			  '&notransaksi='+notransaksi+
			  '&kodeorganisasi='+kodeorganisasi+
			  '&periode='+periode+
			  '&tipetransaksi='+tipetransaksi+
			  '&kodekegiatan='+kodekegiatan+
			  '&jenistransaksi='+jenistransaksi+
			  '&jumlahsdm='+jumlahsdm+
			  '&kodekma='+kodekma+
			  '&hasilkerja='+hasilkerja+
			  '&tanggalmulai='+tanggalmulai+
			  '&jampemakaian='+jampemakaian+
			  '&tanggalselesai='+tanggalselesai+
			  '&totaljamlembur='+totaljamlembur+
			  '&jam1='+jam1+
			  '&menit1='+menit1+
			  '&detik1='+detik1+
			  '&kwhawal='+kwhawal+
			  '&jam2='+jam2+
			  '&menit2='+menit2+
			  '&detik2='+detik2+
			  '&kwhakhir='+kwhakhir+
			  '&keterangan1='+keterangan1+
			  '&keterangandetail='+keterangandetail;
		tujuan='traksi_slave_OMS.php';
		post_response_text(tujuan, param, respog);	   
		function respog(){
			if(con.readyState==4){
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
											alert('ERROR\n' + con.responseText);
									}
									else {
										
										var a=con.responseText.split('|');
										alert(a[0]);										
										document.getElementById('notransaksi1').value=a[1];
										numchange();
									}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
			}	
		}  
	
}


function namakegiatan(){
	var str=document.getElementById('pilihtipe').value;
	var pilih=document.getElementById('pilihjenis3').value;
	
	if(str!='OMS')
	{
		if(pilih=='Service' || pilih=='S')
		{
			document.getElementById('namakegiatan').hidden = true;
			document.getElementById('optoperation1').hidden = false;//service
			document.getElementById('optoperation2').hidden = true;//maintenance
		}	
		if(pilih=='Maintenance' || pilih=='M')
		{
			document.getElementById('namakegiatan').hidden = true;
			document.getElementById('optoperation1').hidden = true;//service
			document.getElementById('optoperation2').hidden = false;//maintenance
		}	
	}else
	{
		document.getElementById('namakegiatan').hidden = false;
		document.getElementById('optoperation1').hidden = true;//service
		document.getElementById('optoperation2').hidden = true;//maintenance
	}
}

function tipeonchange(){
	var str=document.getElementById('pilihtipe').value;
	var x = document.getElementById("pilihjenis3");
	while(x.length > 0) {
			x.remove(x.length-1);
	}
	if(str=='')
	{
		return;
	}
	var y = document.getElementById("pilihjenis1");
	if(str=='OMS')
	{
		document.getElementById('namakegiatan').hidden = false;
		document.getElementById('optoperation1').hidden = true;//service
		document.getElementById('optoperation2').hidden = true;//maintenance
		y = document.getElementById("pilihjenis2");
	}else{		
		document.getElementById('namakegiatan').hidden = true;
		document.getElementById('optoperation1').hidden = true;//service
		document.getElementById('optoperation2').hidden = false;//maintenance
	}
	
	for(i = 0; i < y.length; i++)
	{
		var option = document.createElement("option");
			y.selectedIndex = i;
			option.text = y.options[i].text;
			x.add(option,y.options[i].value);
	}
	
}

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	document.getElementById('method').value='INSERTHEADER';
}

function search(){
	param='method=SHOWHEADER&filter='+document.getElementById('filter').value+'&keyword='+document.getElementById('keyword').value;
        tujuan = 'traksi_slave_OMS.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container').innerHTML=con.responseText;
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }
}


function caribarang(irow){
		var filter=document.getElementById('filterx').value;
		var keyword=document.getElementById('keywordx').value;
		param='method=FILTERBARANG&filter='+filter+'&keyword='+keyword+'&irow='+irow;
        tujuan = 'traksi_slave_OMS.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('containerxx').innerHTML=con.responseText;
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }		
}

function ShowData(){
	document.getElementById('form').style.display = 'none';
	document.getElementById('listdata').style.display = '';
	param='method=SHOWHEADER&filter=&keyword=';
        tujuan = 'traksi_slave_OMS.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container').innerHTML=con.responseText;
								document.getElementById('method').value='INSERTHEADER';
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }		
}

function loadData(){
	param='method=SHOWHEADER&filter=&keyword=';
        tujuan = 'traksi_slave_OMS.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container').innerHTML=con.responseText;
								document.getElementById('method').value='INSERTHEADER';
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }		
}