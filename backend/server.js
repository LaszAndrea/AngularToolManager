const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/adatbazis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB csatlakoztatva'))
.catch(err => console.error('MongoDB hiba:', err));

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
});

const ToolTypes = mongoose.model('ToolTypes', {
  name: String,
  model: String,
  type: String,
  pictureURL: String
});

const Tool = mongoose.model('Tool', {
  serialNumber: String,
  status: String,
  model: String
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ success: false, message: 'Hibás email vagy jelszó' });
  } 
  
  if (user.password !== password) {
    return res.status(401).json({ success: false, message: 'Hibás email vagy jelszó' });
  }

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.json({ success: true, user: userWithoutPassword });

});

app.post('/api/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.post('/api/addToolType', async (req, res) => {
  const toolType = new ToolTypes(req.body);
  await toolType.save();
  res.status(201).json(toolType);
});

app.post('/api/addTool', async (req, res) => {
  const tool = new Tool(req.body);
  await tool.save();
  res.status(201).json(tool);
});

app.get('/api/getToolTypes', async (req, res) => {
  try{
    const toolTypes = await ToolTypes.find();
    res.json(toolTypes);
  }catch(err){
    res.status(500).json({ message: 'Hiba a lekérés során.' });
  }
});

app.get('/api/getTools', async (req, res) => {
  try{
    const model = req.query.model;
    const tools = await Tool.find({model});
    res.json(tools);
  }catch(err){
    res.status(500).json({ message: 'Hiba a lekérés során.' });
  }
});

app.get('/api/getToolTypeById/:id', async (req, res) => {
  const toolType = await ToolTypes.findById(req.params.id);
  if (!toolType) return res.status(404).json({ message: 'Nem található' });
  res.json(toolType);
});

app.get('/api/tooltypes/models', async (req, res) => {
  try {
    const models = await ToolTypes.distinct('model');
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: 'Szerver hiba.' });
  }
});

app.put('/api/tooltypes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedToolType = await ToolTypes.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedToolType) {
      return res.status(404).json({ message: 'ToolType nem található' });
    }

    res.json(updatedToolType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hiba történt a módosítás során.' });
  }
});

app.delete('/api/deleteToolType/:id', async (req, res) => {
  try {
    const toolTypeId = req.params.id;

    const toolType = await ToolTypes.findById(toolTypeId);
    if (!toolType) {
      return res.status(404).json({ message: 'ToolType nem található' });
    }

    await Tool.deleteMany({ model: toolType.model });

    await ToolTypes.findByIdAndDelete(toolTypeId);

    res.status(200).json({ message: 'ToolType és a hozzátartozó Tool-ok sikeresen törölve.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hiba történt a törlés során.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend fut a ${PORT}-as porton`);
});