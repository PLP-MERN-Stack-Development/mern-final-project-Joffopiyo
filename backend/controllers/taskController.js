const Task = require('../models/Task');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('createdBy', 'username avatar')
            .populate('assignedTo', 'username avatar')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
exports.createTask = async (req, res) => {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user.id
        });

        const task = await newTask.save();

        // Populate user details for the response
        const populatedTask = await Task.findById(task._id)
            .populate('createdBy', 'username avatar')
            .populate('assignedTo', 'username avatar');

        // Emit socket event
        const io = req.app.get('io');
        io.emit('taskCreated', populatedTask);

        res.json(populatedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
exports.updateTask = async (req, res) => {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Check user (optional: allow only creator or assignee to update?)
        // For now, allow any authenticated user to update any task for collaboration

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.assignedTo = assignedTo || task.assignedTo;

        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate('createdBy', 'username avatar')
            .populate('assignedTo', 'username avatar');

        const io = req.app.get('io');
        io.emit('taskUpdated', populatedTask);

        res.json(populatedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Check user
        if (task.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await task.deleteOne();

        const io = req.app.get('io');
        io.emit('taskDeleted', req.params.id);

        res.json({ msg: 'Task removed', id: req.params.id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
