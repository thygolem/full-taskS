CREATE TABLE esp32(id Serial, mac text, bfz text, alias text);

-- \d
-- \l

-- \d esp32


insert into esp32(mac, bfz, alias) values ('00:00:00:00:00:01', 'a/a/a', 'oficina');
insert into esp32(mac, bfz, alias) values ('00:00:00:00:00:02', 'b/b/b', 'taller');

SELECT * FROM esp32
