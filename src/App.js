import "antd/dist/antd";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Button, Table, Modal, Input, Drawer } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [agregandoproducto, setAgregandoProducto] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editandoproducto, seteditandoproducto] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: uuidv4(),
      nombre: "Coca-Cola",
      cantidad: "3 Cajas",
      precio: "$14.990",
    },
    {
      id: uuidv4(),
      nombre: "Pepsi",
      cantidad: "5 cajas",
      precio: "$16.990",
    },
    {
      id: uuidv4(),
      nombre: "Fanta",
      cantidad: "6 cajas",
      precio: "$18.990",
    },
    {
      id: uuidv4(),
      nombre: "Limon Soda",
      cantidad: "7 cajas",
      precio: "$20.990",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Producto",
      dataIndex: "nombre",
    },
    {
      key: "3",
      title: "Cantidad",
      dataIndex: "cantidad",
    },
    {
      key: "4",
      title: "Precio",
      dataIndex: "precio",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditProducto(record);
                
              }}
              style={{ color: "blue", marginLeft: 10 }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteProducto(record);
              }}
              style={{ color: "red", marginLeft: 12 }
            }
              
            />
          </>
        );
      },
    }
  ];

  // const onAddProducto = () => {
  //   const randomNumber = parseInt(Math.random() * 1000);
  //   const newProducto = {
  //     id: randomNumber,
  //     nombre: " ", 
  //     cantidad: randomNumber + " ",
  //     precio: " " + randomNumber,
  //   };
  //   setDataSource((pre) => {
  //     return [...pre, newProducto];
  //   });
  // }
  
  const onDeleteProducto = (record) => {
    Modal.confirm({
      title: "Seguro que quieres eliminar este producto?",
      okText: "Si",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((productos) => productos.id !== record.id);
        });
      },
    });
  };
  const onEditProducto = (record) => {
    setIsEditing(true);
    seteditandoproducto({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    seteditandoproducto(null);
  };

  const onAddProducto = (record) => {
    setIsAdding(true);
    setAgregandoProducto({ ...record });
  };

  const resetAdding = () => {
    setIsAdding(false);
    setAgregandoProducto(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button className="agregar" type="primary" onClick={onAddProducto}>Agregar nuevo producto</Button>

        <Table columns={columns} dataSource={dataSource}></Table>
        <Drawer title="Editar Producto" visible={isEditing} onClose={() => { resetEditing();}}>
          <Input
            value={editandoproducto?.nombre}
            onChange={(e) => {
              seteditandoproducto((pre) => {
                return { ...pre, nombre: e.target.value };
              });
            }}
          />
          <Input
            value={editandoproducto?.cantidad}
            onChange={(e) => {
              seteditandoproducto((pre) => {
                return { ...pre, cantidad: e.target.value };
              });
            }}
          />
          <Input
            value={editandoproducto?.precio}
            onChange={(e) => {
              seteditandoproducto((pre) => {
                return { ...pre, precio: e.target.value };
              });
            }}
          />

          <Button type = "primary" primary
          onClick={() => {
            setDataSource((pre) => {
              return pre.map((productos) => {
                if (productos.id === editandoproducto.id) {
                  return editandoproducto;
                } else {
                  return productos;
                }
              });
            });
            resetEditing();
          }}>Guardar</Button>


          <Button type ="primary" danger onClick={() => {
            resetEditing();
          }}>Cancelar</Button>

        </Drawer>
        <Drawer title="Agregar Producto" visible={isAdding} onClose={() => { resetAdding();}}>
        
        <Input placeholder="Nombre del producto"
            
            value={agregandoproducto?.nombre}
            onChange={(e) => {
              setAgregandoProducto((pre) => {
                return { ...pre, nombre: e.target.value };
              });
            }}
          />
          <Input placeholder="Cantidad en cajas"
            value={agregandoproducto?.cantidad}
            onChange={(e) => {
              setAgregandoProducto((pre) => {
                return { ...pre, cantidad: e.target.value };
              });
            }}
          />
          <Input placeholder="Precio"
            label='$'
            value={agregandoproducto?.precio}
            onChange={(e) => {
              setAgregandoProducto((pre) => {
                return { ...pre, precio: e.target.value };
              });
            }}
          />
          <Button type = "primary" primary
          onClick={() => {
            
              const newProducto = {
                id: uuidv4(),
                nombre: agregandoproducto?.nombre, 
                cantidad:   agregandoproducto?.cantidad +' Cajas',
                precio: "$"+agregandoproducto?.precio,
              };
              setDataSource((pre) => {
            return [...pre, newProducto];  });
            resetAdding();
          }}>Guardar</Button>
          <Button type ="primary" danger onClick={() => {
            resetAdding();
          }}>Cancelar</Button>
        </Drawer>
      </header>
    </div>
  );
}

export default App;