package com.archeo.common.models;


import com.archeo.common.converter.JsonToMapConverter;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Map;

@Entity
@Data
@Table(name="permissions")
@Builder
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String resource;
    private String action;

    @Column(name = "attribute_conditions", columnDefinition = "jsonb")
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, String> attributeConditions;

    @Column(name="created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;
}
