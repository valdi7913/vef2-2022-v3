import {
  createEvent, deleteEvent, listEventByName, listEvents, register,
  unregister, updateEvent
} from '../lib/db.js';

export async function getEvents(req, res) {
  const events = await listEvents();
  if (events) {
    res.json({
      message: 'Viðburðir',
      events
    });
  } else {
    res.json({
      message: "Fann ekki viðburðir"
    });
  }
}

export async function getEvent(req, res) {
  const event = await listEventByName(req.params.name);
  if (event) {
    res.json({
      message: 'Viðburður fundinn',
      event
    });
  } else {
    res.json({
      message: "Fann ekki viðburðinn"
    });
  }
}

export async function registerEvent(req, res) {
  const event = await createEvent(req.body);
  if (event) {
    res.json({
      message: 'Viðburður búinn til',
      event
    });
  } else {
    res.json({
      message: "Gat ekki búið til viðburðinn"
    });
  }
}

export async function changeEvent(req, res) {
  const event = await updateEvent(req.params.id, req.body);
  if (event) {
    res.json({
      message: 'Viðburður uppfærður',
      event
    });
  } else {
    res.json({
      message: "Gat ekki uppfært viðburðinn"
    });
  }
}

export async function registerForEvent(req, res) {
  const event = await register(req.body);
  if (event) {
    res.json({
      message: `Notandi skráður á viðburð ${event.name}`,
      event
    });
  } else {
    res.json({
      message: "Gat ekki skráð notandann á viðburð"
    });
  }
}

export async function unregisterFromEvent(req, res) {
  const event = await unregister(req.body);
  if (event) {
    res.json({
      message: `Notandi fjarlægður úr viðburð ${event.name}`,
      event
    });
  } else {
    res.json({
      message: "Gat ekki fjarlægt notandann úr viðburð"
    });
  }
}

export async function removeEvent(req, res) {
  const event = await deleteEvent(req.params.id);
  if (event) {
    res.json({
      message: 'Viðburði eytt',
      event
    });
  } else {
    res.json({
      message: "Gat ekki eytt viðburði"
    });
  }
}
