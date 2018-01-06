/**
 * @author Developer
 */
function setSloc(x){
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
//set value display periode
    tglstart=document.getElementById(gudang+'_start').value;
	tglend=document.getElementById(gudang+'_end').value;
	tglstart=tglstart.substr(6,2)+"-"+tglstart.substr(4,2)+"-"+tglstart.substr(0,4);
	tglend=tglend.substr(6,2)+"-"+tglend.substr(4,2)+"-"+tglend.substr(0,4);
	document.getElementById('displayperiod').innerHTML=tglstart+" - "+tglend;
	
	if (gudang != '') {
                    if (x == 'simpan') {
                            document.getElementById('sloc').disabled = true;
                            document.getElementById('btnsloc').disabled = true;
                            tujuan = 'log_slave_getBastNumber.php';
                            param = 'gudang=' + gudang;
                            post_response_text(tujuan, param, respog);
                    }
                    else {
                            document.getElementById('sloc').disabled = false;
                            document.getElementById('sloc').options[0].selected=true;
                            document.getElementById('btnsloc').disabled = false;
                            bersihkan();
                            document.getElementById('nodok').value='';
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
                                            //alert(con.responseText);
                                        document.getElementById('nodok').value = trim(con.responseText);
                                        getBapbList(gudang);
                                    }
                            }
                            else {
                                    busy_off();
                                    error_catch(con.status);
                            }
                    }
            }
}


function getBapbList(gudang)
{
        param='gudang='+gudang;
        tujuan = 'log_slave_getReturSupplierList.php';
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
function cariBapb(num)
{
	tex=trim(document.getElementById('txtbabp').value);
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
    if(gudang =='')
    {
            alert('Storage Location  is obligatory')
    }
    else
    {
            param='gudang='+gudang;
            param+='&page='+num;
            if(tex!='')
                    param+='&tex='+tex;
            tujuan = 'log_slave_getReturSupplierList.php';
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

function Fverify()
{
	nomorlama=trim(document.getElementById('nomorlama').value);
	kodebarang=trim(document.getElementById('kodebarang').value);
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
	if (nomorlama == '' || kodebarang == '' || gudang == '') {
                    alert('lokasi gudang, dokumen and kode barang harus diisi !');
	}
	else {
                    param = 'nomorlama=' + nomorlama + '&kodebarang=' + kodebarang + '&kodegudang=' + gudang;
                    tujuan = 'log_slave_getOldReturSupplier.php';
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
                                    //alert(con.responseText);
                                    parseDong(con.responseText);
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }	
}

function parseDong(tex){
	xml = tex.toString();
	xmlobject = (new DOMParser()).parseFromString(xml, "text/xml");
	
	namabarang = xmlobject.getElementsByTagName('namabarang')[0].firstChild.nodeValue;
	namabarang = namabarang.replace("*", "");
	satuan = xmlobject.getElementsByTagName('satuan')[0].firstChild.nodeValue;
	satuan = satuan.replace("*", "");
	hargasatuan = xmlobject.getElementsByTagName('hargasatuan')[0].firstChild.nodeValue;
	hargasatuan = hargasatuan.replace("*", "");
	jumlah = xmlobject.getElementsByTagName('jumlah')[0].firstChild.nodeValue;
	jumlah = jumlah.replace("*", "");
	kodept = xmlobject.getElementsByTagName('kodept')[0].firstChild.nodeValue;
	kodept = kodept.replace("*", "");
	untukpt = xmlobject.getElementsByTagName('untukpt')[0].firstChild.nodeValue;
	untukpt = untukpt.replace("*", "");
	untukunit = xmlobject.getElementsByTagName('untukunit')[0].firstChild.nodeValue;
	untukunit = untukunit.replace("*", "");	
	
	nopo = xmlobject.getElementsByTagName('nopo')[0].firstChild.nodeValue;
	nopo = nopo.replace("*", "");
	namasupplier = xmlobject.getElementsByTagName('namasupplier')[0].firstChild.nodeValue;
	namasupplier = namasupplier.replace("*", "");

	kodesupplier = xmlobject.getElementsByTagName('kodesupplier')[0].firstChild.nodeValue;
	kodesupplier = kodesupplier.replace("*", "");

    document.getElementById('namabarang').value=namabarang;
	document.getElementById('satuan').value=satuan;
	document.getElementById('jlhlama').value=jumlah;
	document.getElementById('hargasatuan').value=hargasatuan;	
	document.getElementById('kodept').value=kodept;
	document.getElementById('untukpt').value=untukpt;
	document.getElementById('untukunit').value=untukunit;
	document.getElementById('nopo').value=nopo;
	document.getElementById('namasupplier').value=namasupplier;
	document.getElementById('supplierid').value=kodesupplier;
        

	//enable button and field
	document.getElementById('savebutton').disabled=false;
	document.getElementById('jlhretur').disabled=false;
	document.getElementById('nomorlama').disabled=true;
	document.getElementById('kodebarang').disabled=true;
	document.getElementById('keterangan').disabled=false;
}		

function simpanRetur()
{
	nodok=document.getElementById('nodok').value;
	nomorlama=trim(document.getElementById('nomorlama').value);
	kodebarang=trim(document.getElementById('kodebarang').value);
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
                hargasatuan=document.getElementById('hargasatuan').value;
	jlhretur=document.getElementById('jlhretur').value;
	keterangan=document.getElementById('keterangan').value;
	tanggal=document.getElementById('tanggal').value;
	satuan=document.getElementById('satuan').value;
	kodept=document.getElementById('kodept').value;
	untukpt=document.getElementById('untukpt').value;
	untukunit=document.getElementById('untukunit').value;
        
	nopo=document.getElementById('nopo').value;
	supplierid=document.getElementById('supplierid').value;
        
	param='nodok='+nodok+'&nomorlama='+nomorlama;
	param+='&kodebarang='+kodebarang+'&gudang='+gudang;
	param+='&hargasatuan='+hargasatuan+'&jlhretur='+jlhretur;
	param+='&keterangan='+keterangan+'&tanggal='+tanggal;
	param+='&satuan='+satuan+'&kodept='+kodept;
	param+='&untukunit='+untukunit+'&untukpt='+untukpt;	
                param+='&nopo='+nopo+'&supplierid='+supplierid;
                
	jlhlama=document.getElementById('jlhlama').value;

		x=tanggal;
		_start=document.getElementById(gudang+'_start').value;
		_end=document.getElementById(gudang+'_end').value;
		while (x.lastIndexOf("-") > -1) {
			x = x.replace("-", "");
		}
		while (x.lastIndexOf("-") > -1) {
		    x=x.replace("/","");
		}
		
		curdateY=x.substr(4,4).toString();
		curdateM=x.substr(2,2).toString();
		curdateD=x.substr(0,2).toString();
		curdate=curdateY+curdateM+curdateD;	
		curdate=parseInt(curdate);
	if (curdate < parseInt(_start) || curdate > parseInt(_end)) {
		alert('Date out of range')
	}	
	else if (parseFloat(jlhlama) < parseFloat(jlhretur)) {
		alert('Return value larger than original');
	}  
	else {
                    if (nodok == '' || jlhretur == '' || tanggal == '') {
                            alert('Document number, Qty and date are obligatory');
                    }
                    else {
                            tujuan = 'log_slave_saveReturSupplier.php';
                            if (confirm('Saving, are you sure..?')) 
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
                                            alert('Saved');
                                            bersihkan();
                                            setSloc('simpan');
                                    }
                            }
                            else {
                                    busy_off();
                                    error_catch(con.status);
                            }
                    }
            }	
}

function bersihkan()
{
	document.getElementById('savebutton').disabled=true;
	document.getElementById('jlhretur').value='0';
	document.getElementById('jlhretur').disabled=true;
	document.getElementById('nomorlama').value='';
	document.getElementById('kodebarang').value='';
	document.getElementById('namabarang').value='';
                document.getElementById('hargasatuan').value=0;
	document.getElementById('jlhlama').value=0;
	document.getElementById('satuan').value='';
	document.getElementById('keterangan').value='';	
	document.getElementById('kodept').value='';	
	document.getElementById('untukunit').value='';
	document.getElementById('untukpt').value='';
                document.getElementById('nomorlama').disabled=false;
	document.getElementById('kodebarang').disabled=false;        
	document.getElementById('nopo').value='';
	document.getElementById('namasupplier').value='';
	document.getElementById('supplierid').value='';
                
}

function previewBapb(notransaksi,ev){
   param='notransaksi='+notransaksi;
   tujuan = 'log_slave_print_retur_supplier_pdf.php?'+param;	
   title=notransaksi;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);
}

function delBapb(notransaksi){
        param='notransaksi='+notransaksi;
        tujuan='log_slave_deleteBapb.php';
        if(confirm('Deleting Document '+notransaksi+', are you sure..?'))
			post_response_text(tujuan, param, respog);	
            
		function respog(){
                    if (con.readyState == 4) {
                            if (con.status == 200) {
                                    busy_off();
                                    if (!isSaveResponse(con.responseText)) {
                                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                    }
                                    else {
                                            setSloc('simpan');
                                    }
                            }
                            else {
                                    busy_off();
                                    error_catch(con.status);
                            }
                    }
        }	
}

function cariGi(title,ev){
if(document.getElementById('sloc').value=='') {
	alert("Pilih gudang terlebih dahulu !");
}	
else {	
	  setSloc('simpan');
	  content= "<div>";
	  content+="<fieldset>GRN:<input type=text id=textpo class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=goCariGi()>Go</button> </fieldset>";
	  content+="<div id=containercari style=\"height:250px;width:470px;overflow:scroll;\"></div></div>";
	  title=title+' GRN:';
	  width='500';
	  height='300';
	  showDialog1(title,content,width,height,ev);
}				   
}

function goCariGi(){
	nomorlama=trim(document.getElementById('textpo').value);
	if(nomorlama.length<4)
	    alert('Text too short');
	else{   
		param='nomorlama='+nomorlama+'&proses=carigi2';
		tujuan = 'log_slave_cariGi.php';
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
								document.getElementById('containercari').innerHTML=con.responseText;
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		}
    }	
}

function goPickGi(nomorlama){
	document.getElementById('nomorlama').value=nomorlama;
	closeDialog();
}

function cariBarang(title,ev){
if(document.getElementById('sloc').value=='') {
	alert("Pilih gudang terlebih dahulu !");
}	
else {	
  setSloc('simpan');
  content= "<div>";
  content+="<fieldset>Item:<input type=text id=textpo class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=goCariBarang()>Go</button> </fieldset>";
  content+="<div id=containercari style=\"height:250px;width:470px;overflow:scroll;\"></div></div>";
  title=title+' Item:';
  width='500';
  height='300';
  showDialog1(title,content,width,height,ev);
}				   
}

function goCariBarang(){
	kodebarang=trim(document.getElementById('textpo').value);
	nomorlama=trim(document.getElementById('nomorlama').value);
	if(kodebarang.length<4)
	   alert('Text too short');
	else{   
		param='kodebarang='+kodebarang+'&nomorlama='+nomorlama+'&proses=caribarang2';
		tujuan = 'log_slave_cariGi.php';
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
									document.getElementById('containercari').innerHTML=con.responseText;
							}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
			}
	}	
}

function goPickBarang(kodebarang,namabarang){
	document.getElementById('kodebarang').value=kodebarang;
	document.getElementById('namabarang').value=namabarang;
	closeDialog();
}


