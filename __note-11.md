now we will create category crud functionality

we will create a adminCategory page and a form named as CategoryForm to do this tasks.

in adminCategory page there we will have different states.

```
  const [name, setName] = useState(""); //for form value to create category
  const [categories, setCategories] = useState([]); //for getting data from server and store it to have all the catefories to show in the page
  const [visible, setVisible] = useState(false); //modal visibility
  const [selected, setSelected] = useState(null); //to store the whole category to updae and deleting purpose.we need the category id to update it. we can use have the id from this then.
  const [updatingName, setUpdatingName] = useState(""); //get the data from the form and set it to use the data while updating.
```

in the useEffect load the data and set it in the categories state.

```
  useEffect(() => {
    loadCategories();
  }, []);
```

antd design is used to update categories using modal.

in the form there are differents props is used,

```
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
```

the buttonText is default Submit to show in the categories page.
but when updating the category we will pass the value, Update so it will change then.
