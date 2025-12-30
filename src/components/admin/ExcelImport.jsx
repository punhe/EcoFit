import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  FileExcelOutlined,
  UploadOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/actions/productActions';

const ExcelImport = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);

  // Template với các trường phù hợp cho cửa hàng đồ cũ
  const templateData = [
    {
      ten_san_pham: 'Áo sơ mi vintage Polo',
      danh_muc: 'Áo',
      thuong_hieu: 'Polo Ralph Lauren',
      gia_ban: 250000,
      gia_goc: 1500000,
      tinh_trang: '90%',
      mo_ta: 'Áo sơ mi vintage từ thập niên 90, chất liệu cotton 100%, form regular fit. Còn rất mới, không rách hay ố.',
      chat_lieu: 'Cotton',
      kich_co: 'M',
      mau_sac: 'Trắng sọc xanh',
      xuat_xu: 'USA',
      so_luong: 1,
      ghi_chu: 'Có vết phai nhẹ ở cổ áo',
      noi_bat: true,
      de_xuat: false,
      link_anh: 'https://example.com/image1.jpg',
      link_anh_phu: 'https://example.com/image2.jpg, https://example.com/image3.jpg'
    },
    {
      ten_san_pham: 'Quần jeans Levis 501',
      danh_muc: 'Quần',
      thuong_hieu: 'Levis',
      gia_ban: 350000,
      gia_goc: 2000000,
      tinh_trang: '85%',
      mo_ta: 'Quần jeans Levis 501 vintage, wash đẹp tự nhiên, form straight fit cổ điển.',
      chat_lieu: 'Denim',
      kich_co: '32',
      mau_sac: 'Xanh đậm',
      xuat_xu: 'Mexico',
      so_luong: 1,
      ghi_chu: 'Có vết sờn nhẹ ở gấu',
      noi_bat: false,
      de_xuat: true,
      link_anh: 'https://example.com/jeans1.jpg',
      link_anh_phu: ''
    },
    {
      ten_san_pham: 'Túi xách Coach vintage',
      danh_muc: 'Túi xách',
      thuong_hieu: 'Coach',
      gia_ban: 800000,
      gia_goc: 5000000,
      tinh_trang: '95%',
      mo_ta: 'Túi xách Coach da thật, thiết kế cổ điển, bên trong còn rất mới.',
      chat_lieu: 'Da thật',
      kich_co: 'Trung',
      mau_sac: 'Nâu',
      xuat_xu: 'USA',
      so_luong: 1,
      ghi_chu: '',
      noi_bat: true,
      de_xuat: true,
      link_anh: 'https://example.com/coach1.jpg',
      link_anh_phu: 'https://example.com/coach2.jpg'
    }
  ];

  // Download Excel template
  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(templateData);

    // Set column widths
    ws['!cols'] = [
      { wch: 30 }, // ten_san_pham
      { wch: 12 }, // danh_muc
      { wch: 20 }, // thuong_hieu
      { wch: 12 }, // gia_ban
      { wch: 12 }, // gia_goc
      { wch: 10 }, // tinh_trang
      { wch: 50 }, // mo_ta
      { wch: 15 }, // chat_lieu
      { wch: 10 }, // kich_co
      { wch: 15 }, // mau_sac
      { wch: 12 }, // xuat_xu
      { wch: 10 }, // so_luong
      { wch: 30 }, // ghi_chu
      { wch: 10 }, // noi_bat
      { wch: 10 }, // de_xuat
      { wch: 50 }, // link_anh
      { wch: 80 }, // link_anh_phu
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'San_pham');

    // Add instruction sheet
    const instructions = [
      { Huong_dan: '📦 HƯỚNG DẪN IMPORT SẢN PHẨM ĐỒ CŨ TỪ EXCEL' },
      { Huong_dan: '' },
      { Huong_dan: '═══════════════════════════════════════════════' },
      { Huong_dan: 'CÁC TRƯỜNG BẮT BUỘC:' },
      { Huong_dan: '═══════════════════════════════════════════════' },
      { Huong_dan: '• ten_san_pham: Tên sản phẩm (VD: Áo sơ mi vintage Polo)' },
      { Huong_dan: '• thuong_hieu: Thương hiệu gốc (VD: Polo, Levis, Gucci...)' },
      { Huong_dan: '• gia_ban: Giá bán (VD: 250000)' },
      { Huong_dan: '' },
      { Huong_dan: '═══════════════════════════════════════════════' },
      { Huong_dan: 'CÁC TRƯỜNG TÙY CHỌN:' },
      { Huong_dan: '═══════════════════════════════════════════════' },
      { Huong_dan: '• danh_muc: Loại sản phẩm (Áo, Quần, Giày, Túi xách, Phụ kiện, Đồ gia dụng)' },
      { Huong_dan: '• gia_goc: Giá mua mới ban đầu (để khách thấy được tiết kiệm bao nhiêu)' },
      { Huong_dan: '• tinh_trang: Tình trạng sản phẩm (99%, 95%, 90%, 85%, 80%, 70%...)' },
      { Huong_dan: '• mo_ta: Mô tả chi tiết về sản phẩm' },
      { Huong_dan: '• chat_lieu: Chất liệu (Cotton, Denim, Da thật, Polyester...)' },
      { Huong_dan: '• kich_co: Kích cỡ (S, M, L, XL hoặc 28, 30, 32... hoặc 38, 39, 40...)' },
      { Huong_dan: '• mau_sac: Màu sắc sản phẩm' },
      { Huong_dan: '• xuat_xu: Xuất xứ/Made in (USA, Japan, Korea, Vietnam...)' },
      { Huong_dan: '• so_luong: Số lượng có sẵn (mặc định là 1)' },
      { Huong_dan: '• ghi_chu: Ghi chú về khuyết điểm hoặc đặc điểm đặc biệt' },
      { Huong_dan: '• noi_bat: Sản phẩm nổi bật (true/false)' },
      { Huong_dan: '• de_xuat: Sản phẩm đề xuất (true/false)' },
      { Huong_dan: '• link_anh: Link ảnh chính của sản phẩm (URL đầy đủ)' },
      { Huong_dan: '• link_anh_phu: Các link ảnh phụ, cách nhau bởi dấu phẩy (,)' },
      { Huong_dan: '' },
      { Huong_dan: '═══════════════════════════════════════════════' },
      { Huong_dan: 'DANH MỤC GỢI Ý:' },
      { Huong_dan: '═══════════════════════════════════════════════' },
      { Huong_dan: '• Áo: Áo sơ mi, áo thun, áo khoác, áo len...' },
      { Huong_dan: '• Quần: Quần jeans, quần tây, quần short...' },
      { Huong_dan: '• Váy/Đầm: Váy, đầm, chân váy...' },
      { Huong_dan: '• Giày dép: Giày, sandal, dép...' },
      { Huong_dan: '• Túi xách: Túi xách, balo, ví...' },
      { Huong_dan: '• Phụ kiện: Thắt lưng, mũ, khăn, kính...' },
      { Huong_dan: '• Đồ gia dụng: Đồ trang trí, đồ dùng...' },
      { Huong_dan: '' },
      { Huong_dan: '⚠️ LƯU Ý HÌNH ẢNH:' },
      { Huong_dan: '  - Link ảnh phải là URL công khai (có thể truy cập trực tiếp)' },
      { Huong_dan: '  - Hỗ trợ các định dạng: jpg, jpeg, png, webp, gif' },
      { Huong_dan: '  - Có thể dùng link từ Google Drive, Imgur, Cloudinary...' },
      { Huong_dan: '  - Nhiều ảnh phụ cách nhau bởi dấu phẩy (,)' },
    ];
    const wsInstructions = XLSX.utils.json_to_sheet(instructions);
    wsInstructions['!cols'] = [{ wch: 70 }];
    XLSX.utils.book_append_sheet(wb, wsInstructions, 'Huong_dan');

    // Add categories sheet
    const categories = [
      { Danh_muc: 'Áo', Mo_ta: 'Áo sơ mi, áo thun, áo polo, áo khoác, áo len, áo vest...' },
      { Danh_muc: 'Quần', Mo_ta: 'Quần jeans, quần tây, quần kaki, quần short...' },
      { Danh_muc: 'Váy/Đầm', Mo_ta: 'Váy, đầm, chân váy, jumpsuit...' },
      { Danh_muc: 'Giày dép', Mo_ta: 'Giày sneaker, giày tây, sandal, dép...' },
      { Danh_muc: 'Túi xách', Mo_ta: 'Túi xách, balo, ví, clutch...' },
      { Danh_muc: 'Phụ kiện', Mo_ta: 'Thắt lưng, mũ, khăn, kính, đồng hồ, trang sức...' },
      { Danh_muc: 'Đồ gia dụng', Mo_ta: 'Đồ trang trí, đồ dùng vintage, sách, đĩa nhạc...' },
    ];
    const wsCategories = XLSX.utils.json_to_sheet(categories);
    wsCategories['!cols'] = [{ wch: 15 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, wsCategories, 'Danh_muc');

    XLSX.writeFile(wb, 'EcoFit_Template_Do_Cu.xlsx');
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get first sheet (San_pham)
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        for (const row of jsonData) {
          try {
            // Validate required fields
            if (!row.ten_san_pham || !row.thuong_hieu || !row.gia_ban) {
              errors.push(`Thiếu thông tin bắt buộc: ${row.ten_san_pham || 'Không có tên'}`);
              errorCount++;
              continue;
            }

            // Parse sizes - có thể là text như "M", "L" hoặc số như "32"
            const sizeValue = row.kich_co ? String(row.kich_co).trim() : '';
            let sizes = [32]; // default
            if (sizeValue) {
              // Check if it's a number
              const numSize = parseInt(sizeValue);
              if (!isNaN(numSize)) {
                sizes = [numSize];
              } else {
                // Convert text size to number range
                const sizeMap = { 'XS': 26, 'S': 28, 'M': 32, 'L': 36, 'XL': 40, 'XXL': 44 };
                sizes = [sizeMap[sizeValue.toUpperCase()] || 32];
              }
            }

            // Build description with condition info
            let fullDescription = row.mo_ta ? String(row.mo_ta).trim() : '';
            if (row.tinh_trang) {
              fullDescription += `\n\n📊 Tình trạng: ${row.tinh_trang}`;
            }
            if (row.chat_lieu) {
              fullDescription += `\n🧵 Chất liệu: ${row.chat_lieu}`;
            }
            if (row.xuat_xu) {
              fullDescription += `\n🌍 Xuất xứ: ${row.xuat_xu}`;
            }
            if (row.ghi_chu) {
              fullDescription += `\n📝 Ghi chú: ${row.ghi_chu}`;
            }
            if (row.gia_goc && Number(row.gia_goc) > Number(row.gia_ban)) {
              const savedPercent = Math.round((1 - Number(row.gia_ban) / Number(row.gia_goc)) * 100);
              fullDescription += `\n💰 Tiết kiệm ${savedPercent}% so với giá gốc ${Number(row.gia_goc).toLocaleString('vi-VN')}đ`;
            }

            // Build keywords from various fields
            const keywords = [];
            if (row.ten_san_pham) keywords.push(...String(row.ten_san_pham).toLowerCase().split(' '));
            if (row.thuong_hieu) keywords.push(String(row.thuong_hieu).toLowerCase());
            if (row.danh_muc) keywords.push(String(row.danh_muc).toLowerCase());
            if (row.chat_lieu) keywords.push(String(row.chat_lieu).toLowerCase());
            keywords.push('vintage', 'secondhand', 'đồ cũ');

            // Parse image URLs
            let imageUrl = '';
            let imageCollection = [];

            if (row.link_anh) {
              imageUrl = String(row.link_anh).trim();
            }

            if (row.link_anh_phu) {
              const additionalImages = String(row.link_anh_phu)
                .split(',')
                .map(url => url.trim())
                .filter(url => url.length > 0);
              imageCollection = additionalImages.map(url => ({ url }));
            }

            // Build product object matching existing schema
            const product = {
              name: String(row.ten_san_pham).trim(),
              brand: String(row.thuong_hieu).trim(),
              price: Number(row.gia_ban),
              description: fullDescription,
              maxQuantity: row.so_luong ? Number(row.so_luong) : 1,
              isFeatured: row.noi_bat === true || row.noi_bat === 'true' || row.noi_bat === 'TRUE',
              isRecommended: row.de_xuat === true || row.de_xuat === 'true' || row.de_xuat === 'TRUE',
              keywords: [...new Set(keywords)], // Remove duplicates
              sizes: sizes,
              availableColors: row.mau_sac ? [String(row.mau_sac).trim()] : ['Mặc định'],
              imageCollection: imageCollection,
              imageUrl: imageUrl
            };

            // Dispatch add product action
            dispatch(addProduct(product));
            successCount++;
          } catch (err) {
            errors.push(`Lỗi xử lý: ${row.ten_san_pham || 'Không rõ'} - ${err.message}`);
            errorCount++;
          }
        }

        setResult({
          success: successCount,
          error: errorCount,
          errors: errors
        });
      } catch (err) {
        setResult({
          success: 0,
          error: 1,
          errors: ['Lỗi đọc file Excel: ' + err.message]
        });
      } finally {
        setImporting(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="excel-import">
      <div className="excel-import-header">
        <FileExcelOutlined className="excel-icon" />
        <div>
          <h3>Import sản phẩm từ Excel</h3>
          <p>Tải template, điền thông tin sản phẩm đồ cũ và upload để thêm nhanh nhiều sản phẩm</p>
        </div>
      </div>

      <div className="excel-import-actions">
        <button
          className="btn-download-template"
          onClick={downloadTemplate}
        >
          <DownloadOutlined />
          Tải Template Excel
        </button>

        <div className="btn-upload-wrapper">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="excel-file-input"
          />
          <label htmlFor="excel-file-input" className="btn-upload">
            {importing ? (
              <>
                <LoadingOutlined />
                Đang import...
              </>
            ) : (
              <>
                <UploadOutlined />
                Chọn file Excel
              </>
            )}
          </label>
        </div>
      </div>

      {result && (
        <div className="excel-import-result">
          {result.success > 0 && (
            <div className="result-success">
              <CheckCircleOutlined />
              <span>Đã import thành công {result.success} sản phẩm</span>
            </div>
          )}
          {result.error > 0 && (
            <div className="result-error">
              <CloseCircleOutlined />
              <span>{result.error} sản phẩm bị lỗi</span>
              {result.errors.length > 0 && (
                <ul>
                  {result.errors.slice(0, 5).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                  {result.errors.length > 5 && (
                    <li>...và {result.errors.length - 5} lỗi khác</li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      <div className="excel-import-note">
        <p>
          <strong>💡 Mẹo:</strong> Template có 3 sheet - "San_pham" (điền dữ liệu), "Huong_dan" (hướng dẫn chi tiết),
          và "Danh_muc" (danh sách danh mục gợi ý). Hình ảnh sẽ cần thêm thủ công sau khi import.
        </p>
      </div>
    </div>
  );
};

export default ExcelImport;
