-- D1 Return the top 10 most active users in the last 7 days, ranked by total interactions
SELECT u.id, u.name, u.email, 
    COUNT(i.id) AS total_interactions 
FROM users u 
JOIN interactions i ON u.id = i.user_id 
WHERE i.created_at >= NOW() - INTERVAL '7 days' 
GROUP BY u.id, u.name, u.email 
ORDER BY total_interactions DESC LIMIT 10;

-- D2 return all posts from users they interact with most, limited to posts from the last 30 days.

SELECT p.id, p.content, p.created_at, 
    COUNT(i.id) AS total_interactions 
FROM posts p 
JOIN interactions i ON p.id = i.post_id 
WHERE p.created_at >= NOW() - INTERVAL '30 days' 
GROUP BY p.content
ORDER BY total_interactions DESC;

-- D3 Find any posts that have been viewed more than 100 times but have zero reactions

SELECT p.id, p.content, p.created_at, 
    COUNT(i.id) AS total_interactions 
FROM posts p 
JOIN interactions i ON p.id = i.post_id 
WHERE p.created_at >= NOW() - INTERVAL '30 days' 
GROUP BY p.content
HAVING COUNT(i.id) > 100 AND COUNT(i.id) = 0

-- D4 Write a query that would help detect potential spam

SELECT u.id, u.name, u.email, 
COUNT(p.id) AS post_count 
FROM users u 
JOIN posts p ON u.id = p.user_id 
WHERE p.created_at >= NOW() - INTERVAL '24 hours' 
GROUP BY u.name, u.email 
HAVING COUNT(p.id) > 20 
ORDER BY post_count DESC;