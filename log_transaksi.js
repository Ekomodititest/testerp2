/**
 * @author Developer
 */
function setSloc(x){
        gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
//set value display periode
        tglstart=document.getElementById(gudang+'_start').value;
        tglend=document.getElementById(gudang+'_end').value;
		tglstart1=document.getElementById(gudang+'_start').value;
        tglend1=document.getElementById(gudang+'_end').value;
		
        tglstart=tglstart.substr(6,2)+"-"+tglstart.substr(4,2)+"-"+tglstart.substr(0,4);
        tglend=tglend.substr(6,2)+"-"+tglend.substr(4,2)+"-"+tglend.substr(0,4);
        document.getElementById('displayperiod').innerHTML=tglstart+" - "+tglend;

        if (gudang != '') {
                if (x == 'simpan') {
                        document.getElementById('sloc').disabled = true;
                        document.getElementById('btnsloc').disabled = true;
                        tujuan = 'log_slave_getBapbNumber.php';
                        param = 'gudang=' + gudang+'&_start='+tglstart1+'&_end='+tglend1;
                        post_response_text(tujuan, param, respog);
                }
                else {
                        document.getElementById('sloc').disabled = false;
                        document.getElementById('sloc').options[0].selected=true;
                        document.getElementById('btnsloc').disabled = false;
                        kosongkan();
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



function getPOSupplier(){
if(document.getElementById('sloc').value == "") {
	alert("Pilih gudang terlebih dahulu !");
} 
else {	
//===================validate date
        gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
        tanggal=document.getElementById('tanggal').value;
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
                alert('Date out of range.\n'+
					  'Please Check Your Accounting Period\n'+
					  'at Application Setup -> Accounting Period.')
        }
		else if(gudang=='') {
			alert('pilih gudang');
		}
        else {
                nopo = document.getElementById('nopo').value;
                if (nopo == '') 
                        alert('No PO is obligatory');
                else {
//                    if(cekPT(gudang,nopo)){						
                        tujuan = 'log_slave_getPoContent.php';
                        param = 'nopo='+nopo+'&tipedata=supplier'+'&gudang='+gudang; 
                        nodok = document.getElementById('nodok').value;
                        nodok = trim(nodok);
                        if (nodok == '') {
                                alert('Please select and save Storage Location');
                        }
                        else 
                                post_response_text(tujuan, param, respog);
 //                   }
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
                                                document.getElementById('idsupplier').value=trim(con.responseText);
                                                document.getElementById('supplier').value=trim(con.responseText);
													
                                          //now get content
                                          param = 'nopo='+nopo+'&tipedata=data&comboinv=yes&gudang='+document.getElementById('sloc').value;
                                          getPOContent(param);		
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }		
}				
}

function getPOContent(param){
                disableHeader();
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                //alert(con.responseText);
                                               document.getElementById('container').innerHTML=con.responseText;
											   param='nopo='+document.getElementById('nopo').value+'&gudang='+document.getElementById('sloc').value;	
											   getPOFaktur(param);
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
	tujuan = 'log_slave_getPoContent.php';
	post_response_text(tujuan, param, respog);				
}


function getPOFaktur(param){
                tujuan = 'log_comboboxinv.php';
                post_response_text(tujuan, param, respog);
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                //alert(con.responseText);
                                                document.getElementById('nofaktur').innerHTML=con.responseText;
												
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}



function disableHeader(){
        document.getElementById('tanggal').disabled=true;
        document.getElementById('nosj').disabled=false;
        document.getElementById('nofaktur').disabled=false;
        document.getElementById('nopo').disabled=true;
        document.getElementById('btnheader').disabled=true;
}
function enableHeader(){
        document.getElementById('tanggal').disabled=false;
        document.getElementById('nosj').disabled=false;
        document.getElementById('nofaktur').disabled=false;
        document.getElementById('nopo').disabled=false;
        document.getElementById('btnheader').disabled=false;	
}

function kosongkan(){
		document.getElementById('nopo').value='';
		document.getElementById('nofaktur').value='';
		document.getElementById('idsupplier').value='';
		document.getElementById('supplier').value='';
		document.getElementById('nodok').value='';
		document.getElementById('container').innerHTML='';
		document.getElementById('containerlist').innerHTML='';
		enableHeader();	
}

function cekButton(txbox,idbtn){
        x=trim(txbox.value);
        if(parseFloat(x)<0 || x=='' || parseFloat(x)=='NaN'){
                document.getElementById(idbtn).disabled=true;
        }
        else{
                document.getElementById(idbtn).disabled=false;
        }
}

function getBapbList(gudang){
                param='gudang='+gudang;
                tujuan = 'log_slave_getBapbList.php';
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

function saveItemPo(kodebarang,sisa){
        //get all data
		nosj = document.getElementById('nosj').value;

		if(nosj=='') {
			alert("No Surat Jalan Wajib Diisi.");
		} 
		else {	
		
		
        gudang=document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
        nodok = trim(document.getElementById('nodok').value);
        idsupplier = document.getElementById('idsupplier').value;
        tanggal = document.getElementById('tanggal').value;
        nopo = document.getElementById('nopo').value;
        nofaktur = document.getElementById('nofaktur').value;
        qty = document.getElementById('qty' + kodebarang).value;
		rak = document.getElementById('rak' + kodebarang).value;
        satuan=trim(document.getElementById('sat' + kodebarang).innerHTML);
		keterangan = document.getElementById('keterangan').value;

        param = 'nodok=' + nodok + '&idsupplier=' + idsupplier + '&tanggal=' + tanggal;
        param += '&nopo=' + nopo + '&nofaktur=' + nofaktur + '&nosj=' + nosj;
        param += '&qty=' + qty+'&kodebarang='+kodebarang+'&kodegudang='+gudang;
        param += '&satuan='+satuan+'&rak='+rak+'&keterangan='+keterangan;
		//alert(param);
                tujuan = 'log_slave_saveBapb.php';
                if (nodok == '' || parseFloat(qty) < 0 || parseFloat(qty) == 'NaN') {
                  alert('Volume or document number is obligatory');
                }
                else {
					if(parseFloat(qty)>sisa){
						alert('Sorry, volume greater than volume on PO');
					}
					else{
						document.getElementById('qty'+kodebarang).style.backgroundColor='orange';
						post_response_text(tujuan, param, respog);
					}
                }
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                                document.getElementById('qty'+kodebarang).style.backgroundColor='red';
                                        }
                                        else {
												document.getElementById('qty'+kodebarang).style.backgroundColor='#E8F4F4';
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
		}
}

function selesaiBapb(){
if(document.getElementById('nosj').value=='') {
	alert(document.getElementById('suratjalan').value + ' ' + document.getElementById('alertrequired').value);
} 
else {
	gudang=document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
	getBapbList(gudang);
	kosongkan();
	setSloc('simpan');
	location.reload();
}	
}

function previewBapb(notransaksi,ev){
	param='notransaksi='+notransaksi;
	tujuan = 'log_slave_print_bapb_pdf.php?'+param;	
 //display window
   title=notransaksi;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);

}

function editBapb(notransaksi,nopo,tanggal,nosj,nofaktur,supplier,suppliernm){
		document.getElementById('nofaktur').value = nofaktur;
        document.getElementById('nodok').value=notransaksi;
        document.getElementById('idsupplier').value=supplier;
        document.getElementById('supplier').value=suppliernm;
        document.getElementById('nosj').value=nosj;
        document.getElementById('nopo').value=nopo;
        document.getElementById('tanggal').value=tanggal;	
        param = 'nopo='+nopo+'&tipedata=edit&notransaksi='+notransaksi;
        getPOContent(param);
        tabAction(document.getElementById('tabFRM0'),0,'FRM',1);//jangan tanya darimana
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
                                                gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
                                                setSloc('simpan');
                                                //getBapbList(gudang);
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
                tujuan = 'log_slave_getBapbList.php';
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
function cariPO(title,ev){
if(document.getElementById('sloc').value=='') {
	alert("Pilih gudang terlebih dahulu !");
}	
else {	
  //kosongkan();
  setSloc('simpan');
  content= "<div>";
  content+="<fieldset>PO:<input type=text id=textpo class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=goCariPo()>Go</button> </fieldset>";
  content+="<div id=containercari style=\"height:250px;width:470px;overflow:scroll;\"></div></div>";
  title=title+' PO:';
  width='500';
  height='300';
  showDialog1(title,content,width,height,ev);
}				   
}

function goCariPo()
{

                nopo=trim(document.getElementById('textpo').value);
                sloc=trim(document.getElementById('sloc').value);
                if(nopo.length<4)
                   alert('Text too short');
                else
                {   
                param='nopo='+nopo+'&gudang='+sloc;
                tujuan = 'log_slave_cariPo.php';
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

function goPickPo(nopo,kodegudangx){
	document.getElementById('nopo').value=nopo;
	if (getPOSupplier()) {
			param ='nopo='+nopo+'&gudang='+kodegudangx+'&tipedata=data';
			getPOContent(param);
	}
	closeDialog();
}