import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('luxury_categories_v3');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Necklaces', slug: 'necklaces' },
      { id: '2', name: 'Rings', slug: 'rings' },
      { id: '3', name: 'Earrings', slug: 'earrings' },
      { id: '4', name: 'Bracelets', slug: 'bracelets' },
      { id: '5', name: 'Watches', slug: 'watches' },
    ];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('luxury_products_v3');
    if (saved) return JSON.parse(saved);

    const initialProducts = [
      // CATEGORY 1: NECKLACES
      { id: 'n1', name: 'Aurum Herringbone', price: 85000, categoryId: '1', image: '/src/assets/andres-vera-202NAwjisYA-unsplash.jpg', stock: 12, featured: true, description: 'Classic 14k yellow gold herringbone chain.' },
      { id: 'n2', name: 'Lumiere Pendant', price: 180000, categoryId: '1', image: '/src/assets/alex-chambers-TxCbfMc854c-unsplash.jpg', stock: 3, featured: false, description: 'Deep blue sapphire in platinum.' },
      { id: 'n3', name: 'Velvet Choker', price: 550000, categoryId: '1', image: '/src/assets/tessa-edmiston-ECr_8nuXpBA-unsplash.jpg', stock: 1, featured: true, description: 'High-jewelry platinum choker with pear-cut diamonds.' },
      { id: 'n4', name: 'Lunar Pendant', price: 52000, categoryId: '1', image: '/src/assets/jasmin-chew-UBeNYvk6ED0-unsplash.jpg', stock: 9, featured: false, description: 'Ethereal moonstone in silver setting.' },
      { id: 'n5', name: 'Heritage Link', price: 125000, categoryId: '1', image: '/src/assets/max-ducourneau-6uv43p1ePrk-unsplash.jpg', stock: 5, featured: false, description: 'Heavy gold link necklace.' },
      { id: 'n6', name: 'Diamond Bar', price: 72000, categoryId: '1', image: '/src/assets/alex-chambers-TxCbfMc854c-unsplash.jpg', stock: 11, featured: false, description: 'Modern diamond horizontal bar necklace.' },

      // CATEGORY 2: RINGS
      { id: 'r1', name: 'Maison Solitaire', price: 250000, categoryId: '2', image: '/src/assets/segal-jewelry-NsH-CvU0deg-unsplash.jpg', stock: 5, featured: true, description: '18k white gold ring with a 1-carat brilliant-cut diamond.' },
      { id: 'r2', name: 'Eternity Band', price: 320000, categoryId: '2', image: '/src/assets/kateryna-hliznitsova-ceSCZzjTReg-unsplash.jpg', stock: 4, featured: false, description: 'Full circle of emerald-cut diamonds.' },
      { id: 'r3', name: 'Ruby Cluster', price: 210000, categoryId: '2', image: '/src/assets/saeed-anahid--GhLgB-oXNw-unsplash.jpg', stock: 4, featured: false, description: 'Vintage ruby and diamond cluster ring.' },
      { id: 'r4', name: 'Imperial Cocktail', price: 78000, categoryId: '2', image: '/src/assets/kateryna-hliznitsova-P6NiFTyI294-unsplash.jpg', stock: 5, featured: false, description: 'Large amethyst set in rose gold.' },
      { id: 'r5', name: 'Horizon Band', price: 145000, categoryId: '2', image: '/src/assets/arteum-ro-VJZdxfvFGuo-unsplash.jpg', stock: 6, featured: false, description: 'Mysterious black diamond with side stones.' },
      { id: 'r6', name: 'Marquise Solitaire', price: 310000, categoryId: '2', image: '/src/assets/saeed-anahid--GhLgB-oXNw-unsplash.jpg', stock: 4, featured: false, description: 'Stunning marquise-cut diamond ring.' },

      // CATEGORY 3: EARRINGS
      { id: 'e1', name: 'Celestial Drops', price: 45000, categoryId: '3', image: '/src/assets/cat-han-Ks6wd1Zyf1o-unsplash.jpg', stock: 8, featured: true, description: 'Elegant freshwater pearl drop earrings.' },
      { id: 'e2', name: 'Halo Hoops', price: 35000, categoryId: '3', image: '/src/assets/cornelia-ng-zZLhoEwGCeM-unsplash.jpg', stock: 20, featured: false, description: 'Simple 14k gold hoop earrings.' },
      { id: 'e3', name: 'Fire Opal Studs', price: 28000, categoryId: '3', image: '/src/assets/arteum-ro-VJZdxfvFGuo-unsplash.jpg', stock: 15, featured: false, description: 'Australian fire opal studs in gold.' },
      { id: 'e4', name: 'Pearl Studs', price: 18000, categoryId: '3', image: '/src/assets/cat-han-Ks6wd1Zyf1o-unsplash.jpg', stock: 30, featured: false, description: 'Simple 8mm freshwater pearl studs.' },
      { id: 'e5', name: 'Diamond Studs (2ct)', price: 680000, categoryId: '3', image: '/src/assets/cornelia-ng-zZLhoEwGCeM-unsplash(1).jpg', stock: 2, featured: true, description: '2-carat total weight diamond studs.' },
      { id: 'e6', name: 'Rose Petal Studs', price: 32000, categoryId: '3', image: '/src/assets/cat-han-Ks6wd1Zyf1o-unsplash.jpg', stock: 14, featured: false, description: 'Delicate rose-shaped gold earrings.' },

      // CATEGORY 4: BRACELETS
      { id: 'b1', name: 'Satin Cuff', price: 120000, categoryId: '4', image: '/src/assets/nataliya-melnychuk-oO0JAOJhquk-unsplash.jpg', stock: 7, featured: true, description: 'Hand-hammered 18k rose gold cuff.' },
      { id: 'b2', name: 'Grand Tennis', price: 450000, categoryId: '4', image: '/src/assets/nexaro-studio-vbsN7MUXyT4-unsplash.jpg', stock: 2, featured: true, description: 'Classic 5-carat diamond tennis bracelet.' },
      { id: 'b3', name: 'Tri-Bangle Set', price: 95000, categoryId: '4', image: '/src/assets/alex-azabache-y2ErhoE92KA-unsplash.jpg', stock: 6, featured: false, description: 'Stack of three 18k gold bangles.' },
      { id: 'b4', name: 'Beaded Bracelet', price: 24000, categoryId: '4', image: '/src/assets/alex-azabache-y2ErhoE92KA-unsplash.jpg', stock: 22, featured: false, description: 'Hand-strung gold beads on silk.' },
      { id: 'b5', name: 'Engraved Bangle', price: 58000, categoryId: '4', image: '/src/assets/nexaro-studio-vbsN7MUXyT4-unsplash.jpg', stock: 13, featured: false, description: 'Hand-engraved gold bangle with floral motif.' },

      // CATEGORY 5: WATCHES
      { id: 'w1', name: 'Heritage Chrono', price: 890000, categoryId: '5', image: '/src/assets/jesus-eca-wewzzx11ShI-unsplash.jpg', stock: 3, featured: true, description: 'Automatic movement with gold bezel.' },
      { id: 'w2', name: 'Midnight Watch', price: 380000, categoryId: '5', image: '/src/assets/jesus-eca-wewzzx11ShI-unsplash.jpg', stock: 7, featured: false, description: 'Sleek black dial with gold markers.' },
      { id: 'w3', name: 'Executive Watch', price: 950000, categoryId: '5', image: '/src/assets/jesus-eca-wewzzx11ShI-unsplash.jpg', stock: 2, featured: false, description: 'Our most prestigious automatic timepiece.' }
    ];

    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('luxury_categories_v3', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('luxury_products_v3', JSON.stringify(products));
  }, [products]);

  // Category CRUD
  const addCategory = (categoryData) => {
    const name = categoryData.name.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('A collection with this name already exists.');
    }
    const newCategory = { id: Date.now().toString(), name, slug };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id, data) => {
    const name = data.name.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (categories.some(c => c.id !== id && c.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('A collection with this name already exists.');
    }
    setCategories(categories.map(c => c.id === id ? { ...c, name, slug } : c));
  };

  const deleteCategory = (id) => {
    const hasProducts = products.some(p => p.categoryId === id);
    if (hasProducts) throw new Error('Cannot delete category with associated products.');
    setCategories(categories.filter(c => c.id !== id));
  };

  // Product CRUD
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, data) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <StoreContext.Provider value={{
      categories,
      products,
      addCategory,
      updateCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};
