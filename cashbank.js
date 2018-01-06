function gantitrx(flag){
	
	var x=document.getElementById("tipetransaksi").value;
	if (flag==x){
		document.getElementById("sFlag").innerHTML="<b>(D)</b>";
	}else{
		document.getElementById("sFlag").innerHTML="<b>(K)</b>";
	}
}
function editheader(nCounter,ev){
	param="method=LOADEDITHEADER&nCounter="+nCounter;
	tujuan='keu_slave_cashbank.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
									document.getElementById('container').innerHTML=con.responseText;
								}
								else {
									var a=con.responseText.split("|");
									document.getElementById("ncounter").value=nCounter;
									
									document.getElementById("tipetransaksi").value=a[1];
									document.getElementById("accountid").value=a[2];
									document.getElementById("accountname").value=a[3];
									document.getElementById("tgltransaksi").value=a[4];
									document.getElementById("reffno").value=a[5];
									//document.getElementById("docsource").value=a[6];
									//document.getElementById("docsourceno").value=a[7];
									//document.getElementById("namakegiatanx").value=a[7];
									document.getElementById("nilai").value=a[8];
									document.getElementById("keterangan").value=a[9];
									document.getElementById('form').style.display = '';
									document.getElementById('listdata').style.display = 'none';
									document.getElementById('method').value='UPDATEHEADER';	
									ambildetail();
								}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }   
}
	
function showData(){
		document.getElementById('form').style.display = 'none';
		document.getElementById('listdata').style.display = '';
		param="method=LOADDATAHEADER";
		tujuan='keu_slave_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
			  if(con.readyState==4)
			  {
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
										document.getElementById('container').innerHTML=con.responseText;
									}
									else {
										document.getElementById("container").innerHTML=con.responseText;
										headerkosong();
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
		param="method=LOADDATAHEADER";
		tujuan='keu_slave_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
			  if(con.readyState==4)
			  {
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
										document.getElementById('container').innerHTML=con.responseText;
									}
									else {
										document.getElementById("container").innerHTML=con.responseText;
										headerkosong();
									}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
			  }	
         }   
}

function headerkosong(){
	document.getElementById('tipetransaksi').disabled=false;
	document.getElementById('accountid').disabled=true;
	document.getElementById('accountname').disabled=true;
	document.getElementById('tgltransaksi').disabled=false;
	document.getElementById('tipetransaksi').disabled=false;
	document.getElementById('reffno').disabled=false;
	document.getElementById('keterangan').disabled=false;
	document.getElementById('nilai').disabled=false;
	//document.getElementById('docsource').disabled=false;
	//document.getElementById('docsourceno').disabled=false;
	//document.getElementById('namakegiatanx').disabled=false;

	document.getElementById('ncounter').value='';
	document.getElementById('method').value='INSERTHEADER';
	document.getElementById('tipetransaksi').value='DP';
	document.getElementById('accountid').value='';
	document.getElementById('accountname').value='';
	document.getElementById('tgltransaksi').value='';
	document.getElementById('reffno').value='';
	document.getElementById('keterangan').value='';
	document.getElementById('nilai').value=0;
	//document.getElementById('docsource').value='';
	//document.getElementById('docsourceno').value='';
	//document.getElementById('namakegiatanx').value='';
	tabAction(document.getElementById('tabFRM1'),0,'FRM',1);
}

function hapusheader(refno,ev){
		param="method=HAPUSHEADER&nocounter="+refno
		tujuan='keu_slave_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
			  if(con.readyState==4)
			  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
									alert(con.responseText);
								}
								else {
									alert(con.responseText);
									showData();
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
			  }	
         }   
}

function saveCashBankH(){
		var method=document.getElementById('method').value;
		var ncounter=document.getElementById('ncounter').value;
		var tipetransaksi=document.getElementById('tipetransaksi').value;
		var accountid=document.getElementById('accountid').value;
		var accountname=document.getElementById('accountname').value;
		var tgltransaksi=document.getElementById('tgltransaksi').value;
		var reffno=document.getElementById('reffno').value;
		var keterangan=document.getElementById('keterangan').value;
		var nilai=remove_comma(document.getElementById('nilai'));
		//var docsource=document.getElementById('docsource').value; //ditutup sementara
		//var docsourceno=document.getElementById('docsourceno').value;
//		var namakegiatanx=document.getElementById('namakegiatanx').value;
		var docsourceno="";
		var docsource="";
		/*
		if (namakegiatanx!=""){
			docsourceno=namakegiatanx;
		}
		*/
	 
		param="method="+method+"&nocounter="+ncounter+"&kodetransaksi="+tipetransaksi+"&accountid="+accountid+"&accountnm="+accountname;
		param+="&tgltransaksi="+tgltransaksi+"&reffno="+reffno+"&keterangan="+keterangan+"&nilai="+nilai+"&sourceid="+docsource+"&sourcedoc="+docsourceno;
		
		tujuan='keu_slave_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
													alert(con.responseText);
                                                }
                                                else {
													document.getElementById('tipetransaksi').disabled=true;
													document.getElementById('accountid').disabled=true;
													document.getElementById('accountname').disabled=true;
													document.getElementById('tgltransaksi').disabled=true;
													document.getElementById('tipetransaksi').disabled=true;
													document.getElementById('reffno').disabled=true;
													document.getElementById('keterangan').disabled=true;
													document.getElementById('nilai').disabled=true;
													//document.getElementById('docsource').disabled=true;
													//document.getElementById('docsourceno').disabled=true;
													//document.getElementById('namakegiatanx').disabled=true;
													
													tabAction(document.getElementById('tabFRM1'),1,'FRM',1);
													var a=con.responseText.split("##");
													alert(a[0]);													
													document.getElementById('ncounter').value=a[1];
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }   
	
}

function resetCashBankH(){
	headerkosong();
}

function lanjutCashBankH(){	
	tabAction(document.getElementById('tabFRM1'),1,'FRM',1);	
}



function detailkosong(){
		param="method=LOADBARU";
		tujuan='keu_slave_cashbank.php';  
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
													document.getElementById("containerdetail").innerHTML=con.responseText;
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }   
	
}

function saveCashBankD(){
	saveCashBankH();
	var rowCount 	= document.getElementById('dataTable1').rows.length;
	var nocounter	= document.getElementById('ncounter').value;
	if(nocounter==""){
		tabAction(document.getElementById('tabFRM1'),0,'FRM',1);
		return;
	}
	var amount=parseInt(remove_comma(document.getElementById('nilai')));
	var seqno=[];
	var accountid=[];
	var accountnm=[];
	var nilai=[];
	var keterangan=[];
	var cek="";
	var total=0;
	y=0;
	for (i = 1; i < rowCount; i++) { 		
		if (document.getElementById('namaakun_'+i).value!=""){
			accountid[y]=document.getElementById('noakun_'+i).value;
			accountnm[y]=document.getElementById('namaakun_'+i).value;
			nilai[y]=remove_comma(document.getElementById('angka_'+i));
			keterangan[y]=document.getElementById('keterangan_'+i).value;
			total+=parseInt(remove_comma(document.getElementById('angka_'+i)));
			y++;
		}
	}
	
	if (parseInt(total)!= parseInt(amount)){
		alert("Total nilai detail tidak sesuai nilai header.\n Total Detail \t\t: "+total+" \n Total Header \t: "+amount);
		tabAction(document.getElementById('tabFRM1'),1,'FRM',1);
		return;
	}
	param="method=INSERTDETAIL&nocounter="+nocounter+"&accountID="+JSON.stringify(accountid)+"&accountNM="+JSON.stringify(accountnm)+"&amount="+JSON.stringify(nilai)+"&keterangan="+JSON.stringify(keterangan);
	tujuan= 'keu_slave_cashbank.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
			if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									//document.getElementById('contDetails').innerHTML=con.responseText;
							}
							else {
									alert(con.responseText);
							}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
		  }	
         }   
}

function resetCashBankD(){
	detailkosong();
	document.getElementById('method1').value='INSERTDETAIL';
}

function lanjutCashBankD(){	
	tabAction(document.getElementById('tabFRM1'),0,'FRM',1);	
}


function ambildetail(){
		var flag= document.getElementById('ncounter').value;
		param="method=LOADDETAIL&nCounter="+flag;
		tujuan='keu_slave_cashbank.php';  
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




function ambildata(){
		var flag= document.getElementById('docsource').value;
		param="method=AMBILDATA&flag="+flag;
		tujuan='keu_slave_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                       // document.getElementById('docsourceno').innerHTML=con.responseText;
                                                }
                                                else {
													if (flag<4){
													//document.getElementById('namakegiatanx').hidden=true;
													//document.getElementById('docsourceno').hidden=false;
													//document.getElementById('docsourceno').innerHTML=con.responseText;
													}
													else{														//document.getElementById('namakegiatanx').hidden=false;										//document.getElementById('docsourceno').hidden=true;												//document.getElementById('namakegiatanx').innerHTML=con.responseText;											
													}
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }   
}

function searchpil(ev)
{  
		var flag=document.getElementById('tipetransaksi').value;
        showDetail(ev);
		param="method=AKUNTRANSAKSI&dtl=NO&row=&flag="+flag;
		tujuan='keu_slave_cashbank.php';  
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


function searchbrg(row,ev)
{  
		
		var flag=document.getElementById('tipetransaksi').value;
        showDetail(ev);
		param="method=AKUNTRANSAKSI&dtl=YES&row="+row+"&flag="+flag;
		tujuan='keu_slave_cashbank.php';  
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
title="Cari Account";
content="<fieldset><legend></legend><div id=contDetails style='overflow:auto; width:100%; height:100%;' ></div></fieldset>";
width='600';
height='400';
showDialog1(title,content,width,height,ev);	
}


function cariakun(dtl,row){
		var filter=document.getElementById('filterx').value;
		var keyword=document.getElementById('keywordx').value;
		var flag=document.getElementById('tipetransaksi').value;
		param='method=AKUNTRANSAKSI&dtl='+dtl+'&flag='+flag+'&filter='+filter+'&keyword='+keyword+'&row='+row;
        tujuan = 'keu_slave_cashbank.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
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

function dblClick(kodebarang,namabarang){
	document.getElementById('accountid').value=kodebarang;
	document.getElementById('accountname').value=namabarang;
	closeDialog();
}

function sglClick(row,kodebarang,namabarang){
	document.getElementById('noakun_'+row).value=kodebarang;
	document.getElementById('namaakun_'+row).value=namabarang;
	closeDialog();
}

function addRow(inc){
	inc=inc+1;
	$(".item-row:last").after('<tr class="item-row"><td><input disabled=disabled type=text id="noakun_'+inc+'" name="noakun[]" class=myinputtext style=width:100px; onkeypress="return tanpa_kutip(event)" maxlength=100/></td><td><input disabled=disabled type=text id="namaakun_'+inc+'" name="namaakun[]" class=myinputtext style=width:200px; onkeypress="return tanpa_kutip(event)" maxlength=100/><img class=\"dellicon\" src=\"images/zoom.png\" onclick=\"searchbrg('+(inc)+',event)\"/></td><td><input type="text" id="angka_'+inc+'" name="angka[]" class="myinputtextnumber amount" onblur="change_number(this)" onkeypress="return angka_doang(event);" value="0"  style=width:80px; ></td><td><input type="text" id="keterangan_'+(inc)+'" name="keterangan[]" class=myinputtext style=width:200px; onkeypress=\"return tanpa_kutip(event)\" maxlength=100/></td><td><input type="button" name="tambah" value="+" onclick="addRow('+inc+');" class="addrow"/> <input type="button" name="hapus" value="-" onclick="hapus(this);" class="hapus"/></td></tr>');
	$(".hapus"+inc).hide()
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


function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	document.getElementById('method').value='INSERTHEADER';	
}
function list(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	document.getElementById('method').value='INSERTHEADER';	
}