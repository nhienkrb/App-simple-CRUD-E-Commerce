import React, { createContext, useState, useEffect } from "react";

// Tạo context để chứa viewed items
export const ViewedContext = createContext({
  viewedItems: [],
  addItem: () => {},
});

// Đổi tên Provider cho đúng chức năng
export const ViewedProvider = ({ children }) => {
  // Khởi state từ localStorage
  const [viewedItems, setViewedItems] = useState(() => {
    const stored = localStorage.getItem("viewedItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Luôn giữ localStorage đồng bộ khi viewedItems thay đổi
  useEffect(() => {
    localStorage.setItem("viewedItems", JSON.stringify(viewedItems));
  }, [viewedItems]);

  // Thêm item vào viewedItems, luôn nằm đầu, chỉ giữ tối đa 4 mục
  const addItem = (item) => {
    const itemToView = {
      id: item.product.id,
      product_name: item.product.product_name,
      price: item.product.price,
      is_active: item.product.is_active,
      image: item.product.image,
    };

    setViewedItems((prev) => {
      // Loại bỏ nếu đã tồn tại để không bị trùng
      const filtered = prev.filter((ci) => ci.id !== itemToView.id);
      // Đặt item mới lên đầu
      const updated = [itemToView, ...filtered];
      // Cắt mảng chỉ giữ tối đa 4 phần tử
      return updated.slice(0, 4);
    });
  };

  return (
    <ViewedContext.Provider value={{ viewedItems, addItem }}>
      {children}
    </ViewedContext.Provider>
  );
};