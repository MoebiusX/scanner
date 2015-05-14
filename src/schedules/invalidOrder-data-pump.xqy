let $pointer := xdmp:random(9)+1
let $error := (<error><return-code>501</return-code><description>Gateway timeout</description></error>,
              <error><return-code>502</return-code><description>NAS timeout</description></error>,<error><return-code>502</return-code><description>NAS timeout</description></error>, <error><return-code>502</return-code><description>NAS timeout</description></error>,
              <error><return-code>503</return-code><description>IDM timeout</description></error>,<error><return-code>503</return-code><description>IDM timeout</description></error>,<error><return-code>503</return-code><description>IDM timeout</description></error>,
              <error><return-code>503</return-code><description>IDM timeout</description></error>,<error><return-code>503</return-code><description>IDM timeout</description></error>,<error><return-code>503</return-code><description>IDM timeout</description></error>)[$pointer]
let $pointer := xdmp:random(9)+1
let $region := ("North America","North America","North America","North America","North America","Europe","Europe","Asia-Pacific","Latin America","Middle East and Africa")[$pointer]
let $pointer := xdmp:random(9)+1
let $businessLine := ("Memory","Memory","Memory","Memory","Memory","Microprocessors","Commodity Integrated Circuit","Complex SOC","Complex SOC","Complex SOC")[$pointer]

let $orderValue := (xdmp:random(100)*1000)+xdmp:random(999)+(xdmp:random(99) div xs:double(100))
let $cdt := fn:current-dateTime()
let $now := fn:format-dateTime($cdt, "[Y0001][M01][D01]T[H01][m01][s01][f01]")
let $file-name := concat("/data/event_",$now,".xml")
return xdmp:document-insert(
         $file-name,
         <event><status>Warning</status>
         <dataSample>
           <currentDateTime>{$cdt}</currentDateTime>
           <dateTime>{$now}</dateTime>
           <orderValue>{$orderValue}</orderValue>
           <businessLine>{$businessLine}</businessLine>
           <region>{$region}</region>
           <Type>ORDER</Type>
           <content>{$error}</content>
         </dataSample>
         
                  
         
         <dataSample>
           <currentDateTime>{$cdt}</currentDateTime>
           <dateTime>{$now}</dateTime>
           <orderValue>{$orderValue}</orderValue>
           <businessLine>{$businessLine}</businessLine>
           <region>{$region}</region>
           <Type>FILL</Type>
           <content><return-code>0</return-code></content>
         </dataSample>
         
         
         <dataSample>
           <currentDateTime>{$cdt}</currentDateTime>
           <dateTime>{$now}</dateTime>
           <orderValue>{$orderValue}</orderValue>
           <businessLine>{$businessLine}</businessLine>
           <region>{$region}</region>
           <Type>SHIP</Type>
           <content><return-code>0</return-code></content>
         </dataSample>
         
         
         <dataSample>
           <currentDateTime>{$cdt}</currentDateTime>
           <dateTime>{$now}</dateTime>
           <orderValue>{$orderValue}</orderValue>
           <businessLine>{$businessLine}</businessLine>
           <region>{$region}</region>
           <Type>BILL</Type>
           <content><return-code>0</return-code></content>
         </dataSample>
         
         
         <dataSample>
           <currentDateTime>{$cdt}</currentDateTime>
           <dateTime>{$now}</dateTime>
           <orderValue>{$orderValue}</orderValue>
           <businessLine>{$businessLine}</businessLine>
           <region>{$region}</region>
           <Type>CASH</Type>
           <content><return-code>0</return-code></content>
         </dataSample>
         </event>,
         xdmp:default-permissions(),
         xdmp:default-collections()
       )