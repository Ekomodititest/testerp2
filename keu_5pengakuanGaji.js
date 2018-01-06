/**
 * @author Developer
 */
function simpanJ()
{
          
		cnsimpan = document.getElementById('cnfsmpn').value;
		dttdklkp = document.getElementById('tdklkp').value;
		dtsmpn = document.getElementById('dtsmpn').value;
		ids = document.getElementById('ids').value;
		org=document.getElementById('org');
        org=org.options[org.selectedIndex].value;
		gol=document.getElementById('gol');
        gol=gol.options[gol.selectedIndex].value;		
		potongan=document.getElementById('potongan');
        potongan=potongan.options[potongan.selectedIndex].value;
        debet=document.getElementById('debet');
        debet=debet.options[debet.selectedIndex].value;
        kredit=document.getElementById('kredit');
        kredit=kredit.options[kredit.selectedIndex].value;        	
        met=document.getElementById('method').value;
        if(potongan=='' || debet==''  || kredit=='' || org=='' || gol=='')
        {
                alert(dttdklkp);
        }
        else
        {
			 if(confirm(cnsimpan)){
				param='method='+met+'&ids='+ids;
                param+='&potongan='+potongan+'&debet='+debet+'&kredit='+kredit+'&org='+org+'&gol='+gol;
                tujuan='keu_slave_save_5pengakuanGaji.php';
				post_response_text(tujuan, param, respog);
			 }
               		
        }

        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                }
                                                else {
                                                        //alert(con.responseText);
														alert(dtsmpn);
                                                        cancelJ();
                                                        loadData();
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }

}

function fillField(ids,potonganA,loktugA,golA,debetA,kreditA)
{
	potongan=document.getElementById('potongan');
	for(x=0;x<potongan.length;x++)
	{
			if(potongan.options[x].value==potonganA)
			{
					potongan.options[x].selected=true;
			}
	}        
	loktug=document.getElementById('org');
	for(x=0;x<loktug.length;x++)
	{
			if(loktug.options[x].value==loktugA)
			{
					loktug.options[x].selected=true;
			}
	}
	
	golongan=document.getElementById('gol');
	for(x=0;x<golongan.length;x++)
	{
			if(golongan.options[x].value==golA)
			{
					golongan.options[x].selected=true;
			}
	}
        
    debet=document.getElementById('debet');
    for(x=0;x<debet.length;x++)
    {
            if(debet.options[x].value==debetA)
            {
                    debet.options[x].selected=true;
            }
    }
    kredit=document.getElementById('kredit');
    for(x=0;x<kredit.length;x++)
    {
            if(kredit.options[x].value==kreditA)
            {
                    kredit.options[x].selected=true;
            }
    }        
    
    
    document.getElementById('method').value='update';
    document.getElementById('ids').value=ids;
}

function insField(potonganA,loktugA,golA,debetA,kreditA)
{
	potongan=document.getElementById('potongan');
	for(x=0;x<potongan.length;x++)
	{
			if(potongan.options[x].value==potonganA)
			{
					potongan.options[x].selected=true;
			}
	}        
	loktug=document.getElementById('org');
	for(x=0;x<loktug.length;x++)
	{
			if(loktug.options[x].value==loktugA)
			{
					loktug.options[x].selected=true;
			}
	}
	
	golongan=document.getElementById('gol');
	for(x=0;x<golongan.length;x++)
	{
			if(golongan.options[x].value==golA)
			{
					golongan.options[x].selected=true;
			}
	}
        
    debet=document.getElementById('debet');
    for(x=0;x<debet.length;x++)
    {
            if(debet.options[x].value==debetA)
            {
                    debet.options[x].selected=true;
            }
    }
    kredit=document.getElementById('kredit');
    for(x=0;x<kredit.length;x++)
    {
            if(kredit.options[x].value==kreditA)
            {
                    kredit.options[x].selected=true;
            }
    }        
    
}

function delField(ids)
{
		cnhapus = document.getElementById('cnfhps').value;
        param='method=delete';
        param+='&ids='+ids;
        tujuan='keu_slave_save_5pengakuanGaji.php';
        
        if(confirm(cnhapus)){
            post_response_text(tujuan, param, respog);		
        }
        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                }
                                                else {
                                                        //alert(con.responseText);
                                                        cancelJ();
                                                        loadData();
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }
}

function cancelJ()
{

        document.getElementById('org').options[0].selected=true;
        document.getElementById('gol').options[0].selected=true;
        document.getElementById('potongan').options[0].selected=true;
        document.getElementById('debet').options[0].selected=true
        document.getElementById('kredit').options[0].selected=true
        document.getElementById('method').value='insert';		
}
function loadData()
{
        param='method=loadData'
        tujuan='keu_slave_save_5pengakuanGaji.php';
        post_response_text(tujuan, param, respog);


        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                }
                                                else {
                                                        //alert(con.responseText);
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

