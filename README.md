# Bai2_Web
# Thông tin cá nhân
## Họ và tên: Nguyễn Đức Việt
## MSSV: K225480106075
## Lớp: K58KTP
## BÀI TẬP 2
1. Sử dụng github để ghi lại quá trình làm, tạo repo mới, để truy cập public, edit file `readme.md`:
   chụp ảnh màn hình (CTRL+Prtsc) lúc đang làm, paste vào file `readme.md`, thêm mô tả cho ản
2. NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.

2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`

2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name

2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880

2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị

2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.

2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
## BÀI LÀM
### 2.1. Cài đặt Apache Web Server
#### Bước 1: Vô hiệu hóa IIS đang chạy  
- Phải vô hiệu hóa IIS (hoặc ít nhất là dừng nó tạm thời) khi cài đặt Apache vì hai dịch vụ này tranh chấp cùng cổng (80/443), khiến Apache không thể khởi động hoặc hoạt động ổn định
- Mở CMD với quyền Admin và chạy lệnh iisreset /stop  
Vô hiệu hóa iis   
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e0890188-5f6a-49cb-a93f-51593eac1a6c" />  
### Bước 2: Tải xuống Apache Web Server, giải nén trên ổ D  
- Truy cập link https://www.apachelounge.com/download/ để tải Apache về máy.  
- Sau khi tải xuống, giải nén vào thư mục D:\apache\Apache24  
- giải nén  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e7d0929e-1ae1-4703-be47-255584096721" />  
####  Bước 3: Cấu hình Apache   
Cấu hình các file:   
  + D:\Apache24\conf\httpd.conf   
  + D:\Apache24\conf\extra\httpd-vhosts.conf  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4008ebad-3a92-41f4-a6c9-9cdb52c736a9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/81f0ce7d-be7d-4f1a-b17f-c231495a0e5f" />
##### Cấu hình file conf\extra\httpd-vhosts.conf
Trong thẻ <VirtualHost *:80>
- Thay DocumentRoot bằng đường dẫn chứ thư mục web
- Đổi tên ServerName
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b55a4fec-dab2-430e-9377-1aa1662a0693" />
#### Cài đặt và khởi động apache
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c6f873ec-d9d7-481a-b65c-08539f5fd4da" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5222e692-61e8-4483-9100-ec7fbd8b7cd4" />
### 2.2. Cài đặt Nodejs và Nodered.
#### Bước 1: Cài đặt Nodejs
- download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`
- cài đặt vào thư mục `D:\nodejs`
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/71de6d48-e86d-4c7a-bcf0-559f9e093e64" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/80d92202-45d7-4a5f-9e58-06a99ee41a32" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fbcb83b4-d4ea-42e0-b748-9991016e9871" />

### 2.3. Tạo CSDL
Thiết kế cơ sở dữ liệu chứa các thông tin về các sản phẩm trong một web bán sách.
- Database name: Nhan_vien
- Port: 1434
- Username: sa
- Table name: nv
- Server name: DESKTOP-0GSB4AN
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a55aa0fc-b262-45a9-8118-d1c7e73281a1" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0a4f86a5-e91f-4403-8776-8c52f2eede91" />
### 2.4. Cài đặt thư viện trên Notered  
- Mở NOTERED bằng url trên trình duyệt: localhost:1880  
- Chọn Manage Palette rồi chọn Install  
- Cài đặt các thư viện:  
+ node-red-contrib-mssql-plus  
+ node-red-node-mysql  
+ node-red-contrib-telegrambot  
+ node-red-contrib-moment  
+ node-red-contrib-influxdb  
+ node-red-contrib-duckdns  
+ node-red-contrib-cron-plus
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/aff1367c-7868-4928-8e8b-5bf5c41e29c9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f9792d01-d599-4eab-ab6e-1c7466d6ab96" />
- Mở file cấu hình: ```D:\nodejs\nodered\work\settings.js```
- Tìm phần adminAuth, uncomment (bỏ //):
- Sửa chuỗi mã hóa mật khẩu bằng chuỗi mới (chuỗi mã hóa mật khẩu có thể được thiết lập bằng tool ```https://tms.tnut.edu.vn/pw.php```)
- Chạy lại Nodered bằng cmd, vào thư mục ```D:\nodejs\nodered``` và chạy lệnh ```nssm restart a1-nodered```:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d520df1d-a724-4c4d-adc9-79feee7d64cf" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e853337e-8687-4196-b38c-020b831a8201" />
- Sau khi chạy lệnh thành công, Notedred sẽ yêu cầu mật khẩu mới khi đăng nhập:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/22b073bc-24c7-4ee4-abae-f2ffbc087641" />
### 2.5. Tạo API backend bằng Notered
<img width="1920" height="1080" alt="Ảnh chụp màn hình (512)" src="https://github.com/user-attachments/assets/f459efd0-309d-4c30-9139-d0bffd685683" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7bcf304d-f37b-4da2-9c7a-0f051f0f9260" />
<img width="1920" height="1080" alt="Ảnh chụp màn hình (516)" src="https://github.com/user-attachments/assets/9e1441c6-1edc-411c-afb3-1ae480b04735" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2accc70e-6f76-4656-b2c2-6bd20c7f8d7a" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8ab127bb-6e68-46b9-ba6d-efd24c555d6e" />
#### Test API tìm kiếm 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/13c2400e-38ad-4761-a2e9-44bc96fe295b" />
#### Kết quả 
<img width="1831" height="812" alt="Ảnh chụp màn hình (528)" src="https://github.com/user-attachments/assets/ce6a0a15-40a8-4764-97a7-a1adc1f470da" />
### 2.7. Nhận xét bài làm
####  Đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- Quá trình cài đặt giúp em hiểu rõ cách các thành phần trong hệ thống web hoạt động cùng nhau. Em bắt đầu từ việc cài đặt Apache HTTP Server để làm web server, cấu hình `httpd.conf` và `hosts` để truy cập qua tên miền nguyentrunghieu.com. Tiếp theo, em cài Node.js và Node-RED – công cụ chính để xây dựng API back-end. Việc tạo CSDL giúp em nắm rõ cách thiết kế cơ sở dữ liệu phù hợp cho ứng dụng bán sách.
- Quá trình cài đặt thư viện tương đối đơn giản, tìm kiếm và tải xuống lần lượt các thư viện theo yêu cầu của thầy.
- Em cũng gặp một chút khó khăn khi file nssm.exe không cài đặt được, nhưng đã khắc phục bằng một số lệnh cmd và cấu hình dịch vụ thành công. Tất cả các bước đều được thực hiện cẩn thận, kiểm tra từng phần, giúp em hiểu rõ tính tương thích, quyền admin, và cấu hình service.

<strong>Qua đó em hiểu rõ và làm chủ được toàn bộ quy trình cài đặt, từ phần mềm đến thư viện, và biết cách xử lý lỗi thực tế.</strong>
#### Đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- Node-RED là một công cụ mạnh mẽ, trực quan, giúp em xây dựng API back-end mà không cần viết server phức tạp. Em đã tạo một API GET /timkiem nhận tham số q, truy vấn CSDL SQL Server, và trả về dữ liệu dạng JSON.
- Em đã hiểu về việc:
   + Dùng node http in để nhận request
   + Dùng node function để xử lý tham số, tạo câu SQL
   + Dùng node mssql để thực thi truy vấn
   + Dùng node http response để trả JSON
   + Dùng msg.topic và msg.queryType để điều khiển luồng dữ liệu

- Việc debug qua tab Debug và test API bằng trình duyệt giúp em nắm chắc cách hoạt động của từng node.
- Qua đây em đã nắm được cách dùng Node-RED làm back-end, từ thiết kế flow đến xử lý dữ liệu và trả response.
#### Đã hiểu cách frond-end tương tác với back-end ra sao?
Front-end (nguyentrunghieu.com) và back-end (localhost:1880) được kết nối hoàn toàn qua API RESTful. Em hiểu rõ:
   + frontend gọi api
   + backend trả về json -> frontend nhận và hiển thị lên giao diện
   + dữ liệu từ MSSQL -> API -> frontend -> hiển thị real time
   + tìm kiếm live, tự động tải toàn bộ danh sách khi vào trang

<strong> Kết luận: Em đã hiểu cách front-end và back-end tương tác, từ gọi API, xử lý JSON, đến render giao diện động.</strong>
