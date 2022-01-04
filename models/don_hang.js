const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('don_hang', {
    MaDonHang: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'khach_hang',
        key: 'MaKhachHang'
      }
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'loai_san_pham',
        key: 'MaSanPham'
      }
    },
    LoaiSanPham: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'loai_san_pham',
        key: 'LoaiSanPham'
      }
    },
    TongTien: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SoLuongSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: false
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    DiaChiGiaoHang: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    TrangThaiGiaoHang: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'don_hang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaDonHang" },
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
      {
        name: "FK_DON_HANG_MAKHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
        ]
      },
      {
        name: "FK_DON_HANG_SANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
    ]
  });
};
